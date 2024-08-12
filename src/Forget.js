import React, { useState } from 'react';
import axios from 'axios';
import logo from './assests/SkySage_logo_light.png'; // Import your logo
import './Login.css';

const Forget = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Invalid email format.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/reset-password', { email });
      setMessage(response.data.message); // Show success message
    } catch (error) {
      setMessage('Error sending reset link. Please try again.'); // Show error message
    }
  };

  return (
    <section className="login-section">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-box">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="form-value">
            <h2>Forget Password</h2>
            <div className="inputbox">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>
            <br />
            <div>
              <button type="submit">Submit</button>
            </div>
            <br />
            {message && <p>{message}</p>} {/* Show success or error message */}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Forget;
