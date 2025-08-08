// server/server.js

// Import necessary packages
require('dotenv').config(); // Loads environment variables from .env file
const express = require('express'); // Express.js framework for building web applications
const cors = require('cors');     // CORS middleware for enabling cross-origin requests
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies

// Import the registration routes
const registrationRoutes = require('./routes/registration.routes');

// Create an Express application instance
const app = express();

// Define the port for the server to listen on
// It tries to use the PORT environment variable, otherwise defaults to 5000
const PORT = process.env.PORT || 5000;

// Middleware setup
// Enable CORS for all origins
// This allows the frontend (running on a different port/domain) to make requests to the backend
app.use(cors());

// Parse incoming request bodies in JSON format
// This makes it easy to access data sent from the frontend via req.body
app.use(bodyParser.json());

// Use the registration routes
// All routes defined in registrationRoutes will be prefixed with '/api'
app.use('/api', registrationRoutes);

// Basic route for testing the server
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access backend at http://localhost:${PORT}`);
});