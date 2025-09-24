// server/config/db.js
const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');
const path = require('path');

// ✅ Correct dotenv load path for root .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


// ✅ Initialize Neon
const sql = neon(process.env.DATABASE_URL);

module.exports = sql;
