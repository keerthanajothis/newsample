import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Forget from './Forget';
import Info from './Info';
import Feedback from './assests/Feedback';
const App = () => {
  const [users, setUsers] = useState([]);

  const handleSignIn = (email, password) => {
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert('User already exists. Please log in.');
      return;
    }

    const newUser = { email, password };
    setUsers([...users, newUser]);
  };

  const handleLogin = (email, password) => {
    const user = users.find((user) => user.email === email && user.password === password);
    return user ? true : false;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="/Signup" element={<Signup handleSignIn={handleSignIn} />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Feedback" element={<Feedback/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
