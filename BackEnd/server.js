// Import required modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Welcome@123',
  database: 'react_auth'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Default route
app.get('/users', (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql,(err,data) => {
        if(err) return res.json(err);
        return res.json(data);
  }) 
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
