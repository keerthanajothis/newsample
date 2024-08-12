import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assests/SkySage_logo_light.png'; // Replace with your logo path
import './Login.css';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password.trim() || formData.password.length < 8) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post('http://localhost:3001/api/register', formData);
        alert(`Signup Successful!\nEmail: ${formData.email}`);
        // Redirect to the login page
        navigate('/'); // Assuming the login page is at the root path
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;

          if (errorMessage === 'Email already exists') {
            alert('Email already exists');
          } else if (errorMessage === 'Username already exists') {
            alert('Username already exists');
          } else {
            alert('An error occurred, please try again.');
          }
        }
      }
    }

    setErrors(errors);
  };

  return (
    <section className="login-section">
      <div className="gif-container">
        {/* Add your GIF or other content here */}
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-box">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="form-value">
            <h2>Signup</h2>
            <div className="inputbox">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label>Username</label>
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>
            <div className="inputbox">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="inputbox">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <div className="inputbox">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label>Confirm Password</label>
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>
            <br />
            <div>
              <button style={{ padding: '10px', borderRadius: '10px', marginLeft: '10px' }} type="submit">Sign up</button>
            </div>
            <br />
            <div className="register">
              <p>
                Already have an account? <Link to="/">Log in</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
