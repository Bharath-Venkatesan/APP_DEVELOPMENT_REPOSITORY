import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/signup/', {
        name,
        username,
        password,
      });
      if (response.status === 201) {
        navigate('/login'); 
      }
    } catch (error) {
      setError('Error creating account');
    }
  };

  return (
    <Box className="signup-modal-box">
        <img src="https://cdn2.iconfinder.com/data/icons/fintech-butterscotch-vol-2/512/Insurtech-512.png" alt="Logo" className="logo" />
      <Typography variant="h6" component="h2" className="modal-title">
        Create Account
      </Typography>
      <Typography variant="subtitle1" className="subtitle">
        Sign up to get started
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-field"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
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
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-field"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirm-password"
        label="Confirm Password"
        type="password"
        id="confirm-password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        className="signup-button"
        onClick={handleSignup}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupPage;
