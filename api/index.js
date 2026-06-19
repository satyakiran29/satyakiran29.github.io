const fs = require('fs');
const path = require('path');
try {
  const envPath = path.resolve(__dirname, '../.env');
  console.log(`[ENV] Looking for .env at: ${envPath}`);
  console.log(`[ENV] File exists: ${fs.existsSync(envPath)}`);
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const index = trimmed.indexOf('=');
      if (index > 0) {
        const key = trimmed.substring(0, index).trim();
        const val = trimmed.substring(index + 1).trim().replace(/^['"]|['"]$/g, '');
        if (key) {
          process.env[key] = val;
        }
      }
    });
  }
  
  // Mask URI for safe logging
  const rawUri = process.env.MONGODB_URI || 'not defined';
  const maskedUri = rawUri.replace(/:([^:@]+)@/, ':****@');
  console.log(`[ENV] Loaded MONGODB_URI: ${maskedUri}`);
} catch (e) {
  console.log("Not loading local env file:", e.message);
}

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { getDatabase } = require('./db');
const rateLimit = require('express-rate-limit');
const xss = require('xss');

const app = express();

// Trust proxy is required for rate limiters on Vercel to correctly identify IP
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// Global API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  message: { message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', apiLimiter);

// Stricter rate limiter for POST actions (auth and posting messages)
const postLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 POSTs per window
  message: { message: 'Too many actions from this IP, please try again later.' }
});

const JWT_SECRET = process.env.JWT_SECRET || 'super_fallback_secret_key';

// Initialize indexes and collections
let indexesCreated = false;
async function getDb() {
  const db = await getDatabase();
  
  if (!indexesCreated) {
    // Create unique index on username to prevent duplicates
    try {
      await db.collection('users').createIndex({ username: 1 }, { unique: true });
      await db.collection('messages').createIndex({ createdAt: -1 });
      indexesCreated = true;
    } catch (err) {
      console.error("Index creation error:", err);
    }
  }
  
  return db;
}

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const anonId = req.headers['x-anonymous-id'];
  
  if (!token) {
    if (anonId && anonId.startsWith('anon_')) {
      req.user = {
        id: anonId,
        username: 'Anonymous Guest',
        isAnonymous: true
      };
      return next();
    }
    return res.status(401).json({ message: 'Authentication required. Please log in.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Session expired or invalid. Please log in again.' });
    }
    req.user = user;
    next();
  });
}

// --- API ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', time: new Date() });
});

// Register
app.post('/api/auth/register', postLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    const cleanUsername = username.trim();
    if (cleanUsername.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const db = await getDb();
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ username: { $regex: new RegExp(`^${cleanUsername}$`, 'i') } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Use the selected avatarUrl from client, or generate a default one
    const avatarUrl = req.body.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanUsername)}`;

    const newUser = {
      username: cleanUsername,
      passwordHash,
      avatarUrl,
      createdAt: new Date(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip
    };

    const result = await db.collection('users').insertOne(newUser);
    const userId = result.insertedId;

    // Create JWT
    const token = jwt.sign(
      { id: userId.toString(), username: cleanUsername, avatarUrl },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: userId.toString(),
        username: cleanUsername,
        avatarUrl
      }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: 'Server error during registration. Please try again.' });
  }
});

// Login
app.post('/api/auth/login', postLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const cleanUsername = username.trim();
    const db = await getDb();

    // Find user
    const user = await db.collection('users').findOne({ username: { $regex: new RegExp(`^${cleanUsername}$`, 'i') } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id.toString(), username: user.username, avatarUrl: user.avatarUrl },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        avatarUrl: user.avatarUrl
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error during login. Please try again.' });
  }
});

// Get Logged In User Info
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    if (req.user && req.user.isAnonymous) {
      return res.status(200).json({
        id: req.user.id,
        username: req.user.username,
        avatarUrl: req.user.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(req.user.username)}`,
        isAnonymous: true,
        createdAt: new Date()
      });
    }
    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      id: user._id.toString(),
      username: user.username,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error("Me Auth Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Messages (Fetch latest 100 entries)
app.get('/api/messages', async (req, res) => {
  try {
    const db = await getDb();
    const messages = await db.collection('messages')
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    // Map `_id` to string for client consumption
    const formattedMessages = messages.map(msg => ({
      id: msg._id.toString(),
      text: msg.text,
      userId: msg.userId,
      username: msg.username,
      avatarUrl: msg.avatarUrl,
      createdAt: msg.createdAt,
      reactions: msg.reactions || { heart: [], thumbsup: [], fire: [], rocket: [], party: [] }
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("Fetch Messages Error:", error);
    res.status(500).json({ message: 'Server error fetching messages.' });
  }
});

// Add Message (Authenticated)
app.post('/api/messages', authenticateToken, postLimiter, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Message text cannot be empty' });
    }

    const cleanText = xss(text.trim());
    if (cleanText.length > 500) {
      return res.status(400).json({ message: 'Message cannot exceed 500 characters' });
    }

    const db = await getDb();

    let username = req.user.username;
    let avatarUrl = req.user.avatarUrl;
    let isAnonymous = req.user.isAnonymous || false;

    if (isAnonymous) {
      if (req.body.anonymousName && req.body.anonymousName.trim()) {
        username = xss(req.body.anonymousName.trim().substring(0, 25));
      } else {
        username = 'Anonymous Guest';
      }
      if (req.body.anonymousAvatar) {
        avatarUrl = req.body.anonymousAvatar;
      } else {
        avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`;
      }
    }

    const newMessage = {
      text: cleanText,
      userId: req.user.id,
      username,
      avatarUrl,
      isAnonymous,
      createdAt: new Date(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip,
      reactions: {
        heart: [],
        thumbsup: [],
        fire: [],
        rocket: [],
        party: []
      }
    };

    const result = await db.collection('messages').insertOne(newMessage);
    
    res.status(201).json({
      id: result.insertedId.toString(),
      ...newMessage
    });

  } catch (error) {
    console.error("Post Message Error:", error);
    res.status(500).json({ message: 'Server error adding message.' });
  }
});

// Delete Message (Authenticated - Author Only)
app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
  try {
    const messageId = req.params.id;
    if (!ObjectId.isValid(messageId)) {
      return res.status(400).json({ message: 'Invalid message ID' });
    }

    const db = await getDb();
    const message = await db.collection('messages').findOne({ _id: new ObjectId(messageId) });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Verify ownership
    if (message.userId !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied. You can only delete your own messages.' });
    }

    await db.collection('messages').deleteOne({ _id: new ObjectId(messageId) });
    res.status(200).json({ message: 'Message deleted successfully', id: messageId });

  } catch (error) {
    console.error("Delete Message Error:", error);
    res.status(500).json({ message: 'Server error deleting message.' });
  }
});

// Toggle Emoji Reaction (Authenticated)
app.post('/api/messages/:id/react', authenticateToken, postLimiter, async (req, res) => {
  try {
    const messageId = req.params.id;
    const { emoji } = req.body;
    const userId = req.user.id;

    const validEmojis = ['heart', 'thumbsup', 'fire', 'rocket', 'party'];
    if (!validEmojis.includes(emoji)) {
      return res.status(400).json({ message: 'Invalid emoji reaction' });
    }

    if (!ObjectId.isValid(messageId)) {
      return res.status(400).json({ message: 'Invalid message ID' });
    }

    const db = await getDb();
    
    // Find message
    const message = await db.collection('messages').findOne({ _id: new ObjectId(messageId) });
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Initialize reactions structure
    const reactions = message.reactions || { heart: [], thumbsup: [], fire: [], rocket: [], party: [] };
    if (!reactions[emoji]) {
      reactions[emoji] = [];
    }

    const userIndex = reactions[emoji].indexOf(userId);
    let updateQuery;

    if (userIndex > -1) {
      updateQuery = { $pull: { [`reactions.${emoji}`]: userId } };
    } else {
      updateQuery = { $addToSet: { [`reactions.${emoji}`]: userId } };
    }

    await db.collection('messages').updateOne(
      { _id: new ObjectId(messageId) },
      updateQuery
    );

    const updatedMessage = await db.collection('messages').findOne({ _id: new ObjectId(messageId) });
    
    res.status(200).json({
      id: messageId,
      reactions: updatedMessage.reactions || { heart: [], thumbsup: [], fire: [], rocket: [], party: [] }
    });

  } catch (error) {
    console.error("Reaction Error:", error);
    res.status(500).json({ message: 'Server error toggle reaction' });
  }
});

// Export Express app for Vercel Serverless Function hosting
module.exports = app;

// Listen locally if script is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}
