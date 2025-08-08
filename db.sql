-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS coaching_center;

-- Use the newly created database
USE coaching_center;

-- Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    dob VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255),
    class VARCHAR(50),
    address TEXT,
    agreed_to_terms BOOLEAN NOT NULL,
    registration_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);