import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaSignOutAlt, FaTrash, FaPen, FaLock, FaUser, FaComments, FaThumbtack } from 'react-icons/fa';
import './Guestbook.css';

const Guestbook = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  
  // Auth Form State
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register' | 'anonymous'
  const [showAuthPanel, setShowAuthPanel] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [postError, setPostError] = useState('');

  // Predefined Avatar List
  const AVATAR_OPTIONS = [
    'https://api.dicebear.com/7.x/bottts/svg?seed=Felix',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia',
    'https://api.dicebear.com/7.x/lorelei/svg?seed=Garfield',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Funny',
    'https://api.dicebear.com/7.x/identicon/svg?seed=Pattern'
  ];
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  // Fetch messages and check session on mount
  useEffect(() => {
    fetchMessages();
    checkSession();
  }, []);

  const checkSession = async () => {
    const token = localStorage.getItem('guestbook_token');
    if (!token) {
      const anonId = localStorage.getItem('guestbook_anon_id');
      if (anonId) {
        const anonName = localStorage.getItem('guestbook_anon_name') || 'Anonymous Guest';
        const anonAvatar = localStorage.getItem('guestbook_anon_avatar') || AVATAR_OPTIONS[0];
        setUser({
          id: anonId,
          username: anonName,
          avatarUrl: anonAvatar,
          isAnonymous: true
        });
      } else {
        setUser(null);
      }
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        // Token invalid/expired
        localStorage.removeItem('guestbook_token');
        setUser(null);
      }
    } catch (err) {
      console.error('Session check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setActionLoading(true);

    if (!username.trim() || !password) {
      setAuthError('Please fill in all fields');
      setActionLoading(false);
      return;
    }

    if (activeTab === 'register' && password !== confirmPassword) {
      setAuthError('Passwords do not match');
      setActionLoading(false);
      return;
    }

    const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = activeTab === 'login' 
      ? { username, password } 
      : { username, password, avatarUrl: selectedAvatar };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('guestbook_token', data.token);
      setUser(data.user);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('guestbook_token');
    localStorage.removeItem('guestbook_anon_id');
    localStorage.removeItem('guestbook_anon_name');
    localStorage.removeItem('guestbook_anon_avatar');
    setUser(null);
  };

  const handleGuestPost = async (e) => {
    e.preventDefault();
    setPostError('');
    setAuthError('');
    if (!messageText.trim()) return;

    setActionLoading(true);
    try {
      let anonId = localStorage.getItem('guestbook_anon_id');
      if (!anonId) {
        anonId = 'anon_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('guestbook_anon_id', anonId);
      }

      const finalName = username.trim() || 'Anonymous Guest';
      const finalAvatar = selectedAvatar;

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Anonymous-Id': anonId
        },
        body: JSON.stringify({
          text: messageText,
          anonymousName: finalName,
          anonymousAvatar: finalAvatar
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to post guest message');
      }

      localStorage.setItem('guestbook_anon_name', finalName);
      localStorage.setItem('guestbook_anon_avatar', finalAvatar);
      
      setUser({
        id: anonId,
        username: finalName,
        avatarUrl: finalAvatar,
        isAnonymous: true
      });

      setMessages((prev) => [data, ...prev]);
      setMessageText('');
      setUsername('');
    } catch (err) {
      setPostError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handlePostMessage = async (e) => {
    e.preventDefault();
    setPostError('');
    if (!messageText.trim()) return;

    const token = localStorage.getItem('guestbook_token');
    const isAnon = user && user.isAnonymous;
    
    if (!token && !isAnon) {
      setPostError('You must be logged in or continue as Guest to sign the guestbook.');
      return;
    }

    setActionLoading(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      const body = { text: messageText };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (isAnon) {
        headers['X-Anonymous-Id'] = user.id;
        body.anonymousName = user.username;
        body.anonymousAvatar = user.avatarUrl;
      }

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to post message');
      }

      setMessages((prev) => [data, ...prev]);
      setMessageText('');
    } catch (err) {
      setPostError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleReaction = async (msgId, emojiKey) => {
    const token = localStorage.getItem('guestbook_token');
    const isAnon = user && user.isAnonymous;
    if (!token && !isAnon) {
      alert('You must be logged in or continue as Guest to react to messages.');
      return;
    }

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (isAnon) {
        headers['X-Anonymous-Id'] = user.id;
      }

      const res = await fetch(`/api/messages/${msgId}/react`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ emoji: emojiKey })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === msgId ? { ...msg, reactions: data.reactions } : msg
          )
        );
      }
    } catch (err) {
      console.error('Failed to toggle reaction:', err);
    }
  };

  const handleDeleteMessage = async (msgId) => {
    const token = localStorage.getItem('guestbook_token');
    const isAnon = user && user.isAnonymous;
    if (!token && !isAnon) return;

    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (isAnon) {
        headers['X-Anonymous-Id'] = user.id;
      }

      const res = await fetch(`/api/messages/${msgId}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg.id !== msgId));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete message');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="guestbook-loading">
        <div className="guestbook-spinner"></div>
        <p>Loading Guestbook...</p>
      </div>
    );
  }

  return (
    <div className="guestbook-page">
      <Helmet>
        <title>Satyakiran | Guestbook - Sign my Guestbook</title>
        <meta name="description" content="Sign the guestbook of Satyakiran. Leave a message, share feedback, or react to other developer messages." />
        <meta name="keywords" content="Satyakiran, guestbook, sign guestbook, web developer, portfolio comments, developer community" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://satyakiran.vercel.app/guestbook" />
        <meta property="og:title" content="Satyakiran | Guestbook - Sign my Guestbook" />
        <meta property="og:description" content="Sign the guestbook of Satyakiran. Leave a message, share feedback, or react to other developer messages." />
        <meta property="og:image" content="https://raw.githubusercontent.com/satyakiran29/satyakiran29/refs/heads/main/Images/photo_2025-02-15_00-51-41.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://satyakiran.vercel.app/guestbook" />
        <meta name="twitter:title" content="Satyakiran | Guestbook - Sign my Guestbook" />
        <meta name="twitter:description" content="Sign the guestbook of Satyakiran. Leave a message, share feedback, or react to other developer messages." />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/satyakiran29/satyakiran29/refs/heads/main/Images/photo_2025-02-15_00-51-41.jpg" />
      </Helmet>
      <div className="guestbook-container">
        
        {/* Header */}
        <header className="guestbook-header">
          <h1>Guestbook</h1>
          <p className="guestbook-subtitle">Sign my guestbook and share your idea. You can tell me anything here!</p>
        </header>

        <div className="guestbook-layout single-column-layout">
          
          {/* Pinned Welcome Card */}
          <div className="glass-panel message-card pinned-card">
            <div className="message-header">
              <div className="author-info">
                <div className="pinned-icon-wrapper">
                  <FaComments className="pinned-speech-bubble" />
                </div>
                <div>
                  <h4 className="author-name">Hey there! 👋</h4>
                </div>
              </div>
              <FaThumbtack className="pinned-badge-icon" title="Pinned Message" />
            </div>
            <div className="message-body">
              <p>
                Thanks for visiting my website. If you have a moment, I'd love to hear your thoughts on my work. Please log in with your account or continue as Guest to leave a comment. Thanks!
              </p>
            </div>
          </div>

          {/* Action Row / Auth Form */}
          {user ? (
            // Form (Logged In / Guest)
            <div className="glass-panel guestbook-card auth-welcome inline-composer">
              <div className="user-profile-summary">
                <img src={user.avatarUrl} alt="Avatar" className="user-avatar-large" />
                <div className="user-info-text">
                  <h3>Hello, {user.username}!</h3>
                  <p className="status-label">{user.isAnonymous ? 'Guest User' : 'Authenticated User'}</p>
                </div>
                <button onClick={handleSignOut} className="btn-signout" title="Sign Out">
                  <FaSignOutAlt />
                </button>
              </div>

              <form onSubmit={handlePostMessage} className="message-form">
                <div className="form-group">
                  <label htmlFor="message">Leave a message</label>
                  <div className="textarea-container">
                    <textarea
                      id="message"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Write something nice..."
                      maxLength={500}
                      required
                      disabled={actionLoading}
                    />
                    <span className="char-counter">{messageText.length}/500</span>
                  </div>
                </div>

                {postError && <p className="error-message">{postError}</p>}

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={actionLoading || !messageText.trim()}
                >
                  {actionLoading ? (
                    <span className="spinner-small"></span>
                  ) : (
                    <>
                      <FaPen style={{ marginRight: '8px' }} /> Sign Guestbook
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            // Collapsible Auth Trigger
            <div className="auth-trigger-container">
              <div className="auth-trigger-row">
                <button onClick={() => setShowAuthPanel(!showAuthPanel)} className="btn-auth-trigger">
                  Sign in
                </button>
                <span className="auth-trigger-text">to leave a message</span>
              </div>

              {showAuthPanel && (
                <div className="glass-panel guestbook-card auth-card inline-auth-card">
                  <div className="auth-tabs">
                    <button
                      className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                      onClick={() => { setActiveTab('login'); setAuthError(''); setPostError(''); }}
                    >
                      Login
                    </button>
                    <button
                      className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                      onClick={() => { setActiveTab('register'); setAuthError(''); setPostError(''); }}
                    >
                      Register
                    </button>
                    <button
                      className={`auth-tab ${activeTab === 'anonymous' ? 'active' : ''}`}
                      onClick={() => { setActiveTab('anonymous'); setAuthError(''); setPostError(''); }}
                    >
                      Guest
                    </button>
                  </div>

                  {activeTab === 'anonymous' ? (
                    <form onSubmit={handleGuestPost} className="auth-form">
                      <div className="form-group">
                        <label htmlFor="guestname">Your Name (Optional)</label>
                        <div className="input-with-icon">
                          <FaUser className="input-icon" />
                          <input
                            type="text"
                            id="guestname"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Anonymous Guest"
                            maxLength={25}
                            disabled={actionLoading}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Select Profile Logo</label>
                        <div className="avatar-selection-grid">
                          {AVATAR_OPTIONS.map((avatar, idx) => (
                            <img
                              key={idx}
                              src={avatar}
                              alt={`Avatar ${idx + 1}`}
                              className={`avatar-option-preview ${selectedAvatar === avatar ? 'selected' : ''}`}
                              onClick={() => setSelectedAvatar(avatar)}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="guestmessage">Leave a message</label>
                        <div className="textarea-container">
                          <textarea
                            id="guestmessage"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Write something nice..."
                            maxLength={500}
                            required
                            disabled={actionLoading}
                          />
                          <span className="char-counter">{messageText.length}/500</span>
                        </div>
                      </div>

                      {postError && <p className="error-message">{postError}</p>}
                      {authError && <p className="error-message">{authError}</p>}

                      <button type="submit" className="btn-submit" disabled={actionLoading || !messageText.trim()}>
                        {actionLoading ? (
                          <span className="spinner-small"></span>
                        ) : (
                          <>
                            <FaPen style={{ marginRight: '8px' }} /> Sign as Guest
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleAuth} className="auth-form">
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-with-icon">
                          <FaUser className="input-icon" />
                          <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                            minLength={3}
                            required
                            disabled={actionLoading}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                          <FaLock className="input-icon" />
                          <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password (min 6 chars)"
                            minLength={6}
                            required
                            disabled={actionLoading}
                          />
                        </div>
                      </div>

                      {activeTab === 'register' && (
                        <div className="form-group">
                          <label htmlFor="confirmPassword">Confirm Password</label>
                          <div className="input-with-icon">
                            <FaLock className="input-icon" />
                            <input
                              type="password"
                              id="confirmPassword"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Re-enter password"
                              required
                              disabled={actionLoading}
                            />
                          </div>
                        </div>
                      )}

                      {activeTab === 'register' && (
                        <div className="form-group">
                          <label>Select Profile Logo</label>
                          <div className="avatar-selection-grid">
                            {AVATAR_OPTIONS.map((avatar, idx) => (
                              <img
                                key={idx}
                                src={avatar}
                                alt={`Avatar ${idx + 1}`}
                                className={`avatar-option-preview ${selectedAvatar === avatar ? 'selected' : ''}`}
                                onClick={() => setSelectedAvatar(avatar)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {authError && <p className="error-message">{authError}</p>}

                      <button type="submit" className="btn-submit" disabled={actionLoading}>
                        {actionLoading ? (
                          <span className="spinner-small"></span>
                        ) : activeTab === 'login' ? (
                          'Sign In'
                        ) : (
                          'Create Account'
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Messages Feed */}
          <div className="guestbook-feed">
            <h2 className="feed-title">Recent Signatures ({messages.length})</h2>
            
            {messages.length === 0 ? (
              <div className="glass-panel empty-feed">
                <p>No signatures yet. Be the first to leave a message!</p>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map((msg) => (
                  <div key={msg.id} className="glass-panel message-card">
                    <div className="message-header">
                      <div className="author-info">
                        <img src={msg.avatarUrl} alt={`${msg.username}'s avatar`} className="author-avatar" />
                        <div>
                          <h4 className="author-name">{msg.username}</h4>
                          <span className="message-date">{formatDate(msg.createdAt)}</span>
                        </div>
                      </div>
                      
                      {user && user.id === msg.userId && (
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="btn-delete"
                          title="Delete message"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div className="message-body">
                      <p>{msg.text}</p>
                    </div>
                    
                    <div className="message-reactions-row">
                      {[
                        { key: 'heart', emoji: '❤️' },
                        { key: 'thumbsup', emoji: '👍' },
                        { key: 'fire', emoji: '🔥' },
                        { key: 'rocket', emoji: '🚀' },
                        { key: 'party', emoji: '🎉' }
                      ].map((item) => {
                        const reactionsList = msg.reactions?.[item.key] || [];
                        const hasReacted = user && reactionsList.includes(user.id);
                        return (
                          <button
                            key={item.key}
                            onClick={() => handleToggleReaction(msg.id, item.key)}
                            className={`reaction-btn ${hasReacted ? 'active' : ''}`}
                            title={`${reactionsList.length} reaction(s)`}
                          >
                            <span className="reaction-emoji">{item.emoji}</span>
                            {reactionsList.length > 0 && (
                              <span className="reaction-count">{reactionsList.length}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Guestbook;
