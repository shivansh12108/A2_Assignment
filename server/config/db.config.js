// server/config/db.config.js

// Import the dotenv package to load environment variables from a .env file
require('dotenv').config();

// Import the mysql2 package for connecting to MySQL database
const mysql = require('mysql2');

// Create a connection pool to the MySQL database
// A connection pool manages multiple connections, making database interactions more efficient
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', // Database host, defaults to 'localhost'
    user: process.env.DB_USER || 'root',     // Database user, defaults to 'root' (common for XAMPP)
    password: process.env.DB_PASSWORD || '', // Database password, defaults to empty (common for XAMPP)
    database: process.env.DB_NAME || 'coaching_center', // Database name, defaults to 'coaching_center'
    waitForConnections: true, // Whether the pool should wait for connections to become available
    connectionLimit: 10,      // Maximum number of connections in the pool
    queueLimit: 0             // Maximum number of requests the pool will queue before returning an error
});

// Attempt to get a connection from the pool to test if the connection is successful
pool.getConnection((err, connection) => {
    if (err) {
        // If there's an error, log it and exit the process
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    // If connection is successful, log a success message
    console.log('Successfully connected to the database as id ' + connection.threadId);
    // Release the connection back to the pool
    connection.release();
});

// Export the pool so it can be used in other parts of the application (e.g., routes)
module.exports = pool.promise(); // Use .promise() for async/await support