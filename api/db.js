const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

let client = null;
let db = null;

async function getDatabase() {
  if (db) return db;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined. Please check your environment variables or .env file.');
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  db = client.db('guestbook');
  return db;
}

module.exports = { getDatabase };
