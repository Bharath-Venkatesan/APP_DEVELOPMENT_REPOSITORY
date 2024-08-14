// src/components/Sidebar.js
import React from 'react';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const SidebarAdmin = ({ open, toggleSidebar }) => {
  return (
    <Box
      sx={{
        width: 240,
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#f4f4f4',
        transition: 'transform 0.3s ease',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        overflowY: 'auto',
      }}
    >
      <Button component={Link} to="/admin-dashboard/users" variant="contained" fullWidth>
        Users
      </Button>
      <Button component={Link} to="/admin-dashboard/claims" variant="contained" fullWidth>
        Claims
      </Button>
      <Button component={Link} to="/admin-dashboard/support" variant="contained" fullWidth>
        Support
      </Button>
    </Box>
  );
};

export default SidebarAdmin;
