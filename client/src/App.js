// client/src/App.js

import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

function App() {
  // State variables to store form input values
  const [formData, setFormData] = useState({
    full_name: '',
    dob: '',
    email: '',
    phone: '',
    class: '',

    address: '',
    agreed_to_terms: false,
  });

  // State variable for managing form submission messages (success/error)
  const [message, setMessage] = useState('');

  // Handle input changes and update the formData state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic client-side validation
    if (!formData.full_name || !formData.email || !formData.agreed_to_terms) {
      setMessage('Please fill in all required fields (Full Name, Email) and agree to terms.');
      return;
    }

    try {
      // Send a POST request to the backend API
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert form data to JSON string
      });

      // Parse the JSON response from the backend
      const data = await response.json();

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        setMessage(data.message); // Display success message
        // Optionally, clear the form after successful submission
        setFormData({
          full_name: '',
          dob: '',
          email: '',
          phone: '',
          class: '',

          address: '',
          agreed_to_terms: false,
        });
      } else {
        setMessage(data.message || 'Registration failed.'); // Display error message from backend or a generic one
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during registration:', error);
      setMessage('Network error or server is unreachable.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Course Registration</h1>
      </header>
      <main className="App-main">
        <form className="registration-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="full_name">Full Name:</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Class (Dropdown) */}
          <div className="form-group">
            <label htmlFor="class">Class:</label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
            >
              <option value="">Select Class</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
            </select>
          </div>



          {/* Address (Textarea) */}
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Agreed to Terms (Checkbox) */}
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="agreed_to_terms"
              name="agreed_to_terms"
              checked={formData.agreed_to_terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreed_to_terms">I agree to the terms and conditions</label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">Register</button>
        </form>

        {/* Display messages to the user */}
        {message && <p className="message">{message}</p>}
      </main>
    </div>
  );
}

export default App;