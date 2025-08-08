# Course Registration Form Project

This project is a full-stack application for course registration, built with React.js for the frontend, Node.js with Express.js for the backend, and MySQL as the database.

## Project Structure

- `client/`: Contains the React.js frontend application.
- `server/`: Contains the Node.js/Express.js backend application.
  - `server/config/`: Database configuration.
  - `server/routes/`: API routes.

## Setup Instructions

### 1. XAMPP Setup (for MySQL Database)

1.  **Download and Install XAMPP**: If you don't have XAMPP installed, download it from the official Apache Friends website and follow the installation instructions.
2.  **Start Apache and MySQL**: Open the XAMPP Control Panel and start the Apache and MySQL modules.
3.  **Create Database**: Access phpMyAdmin (usually via `http://localhost/phpmyadmin/`) and create a new database named `coaching_center`.
4.  **Import SQL Schema**: Import the `db.sql` file (which will be provided in the project root) into the `coaching_center` database.

### 2. Backend Setup (`server/`)

1.  **Navigate to the server directory**: Open your terminal or command prompt and change the directory to `server/`.
    ```bash
    cd server
    ```
2.  **Install Dependencies**: Install the required Node.js packages.
    ```bash
    npm install
    ```
3.  **Environment Variables**: Create a `.env` file in the `server/` directory and add your database credentials and port number. An example `.env` file will be provided.
4.  **Run the Backend**: Start the Express.js server.
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup (`client/`)

1.  **Navigate to the client directory**: Open a new terminal or command prompt and change the directory to `client/`.
    ```bash
    cd client
    ```
2.  **Install Dependencies**: Install the required React.js packages.
    ```bash
    npm install
    ```
3.  **Run the Frontend**: Start the React development server.
    ```bash
    npm start
    ```
    The frontend application will open in your browser at `http://localhost:3000`.

## Usage

Fill out the registration form in your browser and submit it. The data will be stored in the `registrations` table in your `coaching_center` MySQL database.