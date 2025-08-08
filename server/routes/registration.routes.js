// server/routes/registration.routes.js

// Import the Express.js router to define API routes
const express = require('express');
const router = express.Router();

// Import the database connection pool
const db = require('../config/db.config');

// Define a POST route for user registration
// This route will handle incoming form data from the frontend
router.post('/register', async (req, res) => {
    // Extract form data from the request body
    // The request body contains the JSON data sent from the frontend
    const { full_name, dob, email, phone, class: studentClass, address, agreed_to_terms } = req.body;

    // Basic validation: Check if required fields are present
    // Email is marked as required in the database schema
    if (!full_name || !email || agreed_to_terms === undefined) {
        // If any required field is missing, send a 400 Bad Request error
        return res.status(400).json({ message: 'Please provide full name, email, and agree to terms.' });
    }

    try {
        // SQL query to insert registration data into the 'registrations' table
        const sql = `INSERT INTO registrations (
            full_name, dob, email, phone, class, address, agreed_to_terms
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        // Prepare the values to be inserted into the database
        // The order of values must match the order of columns in the SQL query
        const values = [
            full_name,
            dob,
            email,
            phone,
            studentClass, // 'class' is a reserved keyword in JavaScript, so we use studentClass
            address,
            agreed_to_terms
        ];

        // Execute the SQL query using the connection pool
        // The 'await' keyword ensures that the query completes before moving to the next line
        const [result] = await db.execute(sql, values);

        // Check if the insertion was successful
        if (result.affectedRows > 0) {
            // If successful, send a 201 Created status with a success message
            res.status(201).json({ message: 'Registration successful!', id: result.insertId });
        } else {
            // If no rows were affected, something went wrong with the insertion
            res.status(500).json({ message: 'Registration failed: No rows affected.' });
        }
    } catch (error) {
        // Catch any errors that occur during the database operation
        console.error('Database error during registration:', error);
        // Send a 500 Internal Server Error response with the error message
        res.status(500).json({ message: 'Internal server error during registration.', error: error.message });
    }
});

// Export the router so it can be used by the main server file
module.exports = router;