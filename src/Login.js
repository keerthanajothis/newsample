import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import logo from './assests/SkySage_logo_light.png'; // Adjust the path to your logo file
import './Login.css';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail') || '';
    const storedPassword = localStorage.getItem('userPassword') || '';
    setEmail(storedEmail);
    setPassword(storedPassword);
  }, []);

  useEffect(() => {
    localStorage.setItem('userEmail', email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem('userPassword', password);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password.trim() || password.trim().length < 8) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3001/api/login', { email, password });
        alert('Login Successful!'); 
        handleLogin(response.data.token); 
        window.location.href = '/Info'; 
      } catch (error) {
        if (error.response) {
          const message = error.response.data.message;
          if (message === 'Invalid credentials') {
            alert('Wrong password. Please try again.'); // Show wrong password message
          } else if (message === 'User not found') {
            alert('User not registered. Please register first.'); // Show register message
          } else {
            alert('Login failed. Please try again.'); // Generic error message
          }
        } else {
          alert('Login failed. Please try again.'); // Generic error message
        }
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <section className="login-section">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-box">
          <div className="form-value">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Login</h2>
            <div className="inputbox">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="inputbox">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <div>
              <label className="remember-me">
                <input type="checkbox" /> Remember Me <Link to="/Forget">Forgot</Link>
              </label>
            </div>
            <br />
            <div>
              <button style={{ padding: '10px', borderRadius: '10px', marginLeft: '10px' }} type="submit">Log in</button>
            </div>
            <br />
            <div className="register">
              <p>
                Don't have an account? <Link to="/Signup">Register</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
