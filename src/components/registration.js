// src/components/Registration.js

import React, { useState } from 'react';
import '../assets/css/registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    pin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('username', formData.username);
    localStorage.setItem('email', formData.email);
    localStorage.setItem('password', formData.password);
    localStorage.setItem('pin', formData.pin);

    alert('Registration successful!');
    window.location.href = '/';
  };

  return (
    <div className="register-container">
      <h2 className='RegNameH2'>Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="pin">Pin Code:</label>
        <input
          type="number"
          id="pin"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default Registration;
