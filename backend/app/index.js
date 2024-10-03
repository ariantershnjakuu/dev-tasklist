const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using promise-based API
const cors = require('cors'); // Add this line to import cors

const app = express();
const port = 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Use cors middleware with the specified options
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'mysql',
  user: 'my_user',
  password: 'my_password',
  database: 'my_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Existing API endpoint to fetch all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New API endpoint to insert a booking
app.post('/api/bookings', async (req, res) => {
  const { service, doctor_name, start_time, end_time, date } = req.body;
  const insertQuery = 'INSERT INTO bookings (service, doctor_name, start_time, end_time, date) VALUES (?, ?, ?, ?, ?)';

  try {
    const [result] = await pool.query(insertQuery, [service, doctor_name, start_time, end_time, date]);
    res.status(201).json({ message: "Booking created successfully", id: result.insertId });
  } catch (error) {
    console.error('Error inserting booking:', error);
    res.status(500).json({ error: 'An error occurred while creating the booking' });
  }
});

// New API endpoint to view a specific booking
app.get('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const selectQuery = `SELECT * FROM bookings WHERE id = ?`;

  try {
    const [rows] = await pool.query(selectQuery, [id]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: `An error while fetching the booking: ${error?.message || error}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});