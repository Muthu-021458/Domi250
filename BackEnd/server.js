// Import modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Initialize app
const app = express();
const PORT = 3002;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173' // Allow React frontend
}));
app.use(express.json()); // Parse JSON bodies

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Welcome@123', // replace with your MySQL password
  database: 'react_auth'   // make sure this DB exists
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

// GET all users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'User added', id: result.insertId });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
