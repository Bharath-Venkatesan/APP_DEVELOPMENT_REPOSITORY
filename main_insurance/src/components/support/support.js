import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, IconButton, Menu, Avatar } from '@mui/material';
import FloatingText from '../carousel/floatingtext';
import Footer from '../footer/footer';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Chatbot from '../chatbot/chatbot';

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    category: '',
    orderId: ''
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('');
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const const_api = 'http://localhost:8000/support/';

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(const_api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Support request submitted successfully');
        setFormData({ name: '', email: '', subject: '', message: '', phone: '', category: '', orderId: '' });
      } else {
        alert('Failed to submit support request');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    alert('Logged out');
    navigate('/login')
    handleClose();
  };

  return (
    <div>
      <Header/>
      <Chatbot/>
      <FloatingText/>
      <Container maxWidth="xl">
        <Box mt={4} mb={4} p={3} boxShadow={3} borderRadius={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Support
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              name="category"
              label="Category"
              select
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="Technical Issue">Technical Issue</MenuItem>
              <MenuItem value="Billing">Billing</MenuItem>
              <MenuItem value="General Inquiry">General Inquiry</MenuItem>
              <MenuItem value="Feedback">Feedback</MenuItem>
            </TextField>
            <TextField
              name="orderId"
              label="Order ID (if applicable)"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.orderId}
              onChange={handleChange}
            />
            <TextField
              name="subject"
              label="Subject"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.subject}
              onChange={handleChange}
            />
            <TextField
              name="message"
              label="Message"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.message}
              onChange={handleChange}
            />
            <Box mt={3}>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{backgroundColor:'red'}}>
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
      <Footer/>
    </div>
  );
};

export default SupportForm;
