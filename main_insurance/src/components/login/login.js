import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      
      if (username === 'admin' && password === 'bharath') {
        navigate('/admin-dashboard');
        return; 
      }

      
      const response = await axios.post('http://localhost:8000/login/', {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('username', username); 
        navigate('/home'); 
      }
    } catch (error) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <Box className="login-page">
      <img src="https://cdn2.iconfinder.com/data/icons/fintech-butterscotch-vol-2/512/Insurtech-512.png" alt="Logo" className="logo" />
      <Typography variant="h6" component="h2" className="modal-title">
        Welcome Back
      </Typography>
      <Typography variant="subtitle1" className="subtitle">
        Please login to your account
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-field"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-field"
      />
      {error && (
        <Typography color="error" variant="body2" align="center">
          {error}
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        className="login-button"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>
      <br/>
      <Button
        fullWidth
        variant="contained"
        className="signup-button"
        onClick={handleSignup}
      >
        Sign Up Here
      </Button>
    </Box>
  );
};

export default LoginPage;
