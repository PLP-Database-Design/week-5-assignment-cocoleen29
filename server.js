const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const PORT = 3000;

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});
// 1. Question 1 goes here
app.get('/patients', (req, res) => {
    db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. Question 2 goes here
app.get('/providers', (req, res) => {
    db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 3. Question 3 goes here 
app.get('/patients/filter', (req, res) => {
    const firstName = req.query.first_name;
    db.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 4. Question 4 goes here
app.get('/providers/filter', (req, res) => {
    const specialty = req.query.specialty;
    db.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


// Listen to the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
