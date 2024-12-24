import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
  
      if (response.data.role === 'manager') {
        console.log('Login successful:', response.data);
        onLogin(response.data.token); // Pass the token to the parent component
      } else {
        setErrorMessage('Access denied. Only managers can log in.');
      }
    } catch (error) {
        
      setErrorMessage(error.response?.data?.message || 'Invalid username or password');
      console.error('Login error:', error);
    }
  };
  

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
