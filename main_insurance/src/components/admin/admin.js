import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Support as SupportIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js'; // Added PointElement
import { Line } from 'react-chartjs-2';
import './admin.css'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, ChartTooltip, Legend);

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [supportRequests, setSupportRequests] = useState([]);
  const [activeSection, setActiveSection] = useState('users');
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await axios.get('http://localhost:8000/users/');
        setUsers(userResponse.data);

        const claimResponse = await axios.get('http://localhost:8000/claimsreq/');
        setClaims(claimResponse.data);

        const supportResponse = await axios.get('http://localhost:8000/support-requests/');
        setSupportRequests(supportResponse.data);
        
        // Example of setting chart data (customize as needed)
        setChartData({
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Policies fall chart',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditData(null);
  };

  const handleAddEdit = async () => {
    setLoading(true);
    try {
      const section = activeSection === 'claims' ? 'claimsreq' : activeSection;
      const url = editData.id
        ? `http://localhost:8000/${section}/${editData.id}/`
        : `http://localhost:8000/${section}/`;

      const response = editData.id
        ? await axios.put(url, editData)
        : await axios.post(url, editData);

      if (activeSection === 'users') {
        setUsers(editData.id ? users.map(user => (user.id === editData.id ? response.data : user)) : [...users, response.data]);
      } else if (activeSection === 'claims') {
        setClaims(editData.id ? claims.map(claim => (claim.id === editData.id ? response.data : claim)) : [...claims, response.data]);
      } else {
        setSupportRequests(editData.id ? supportRequests.map(req => (req.id === editData.id ? response.data : req)) : [...supportRequests, response.data]);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    } finally {
      setLoading(false);
      handleDialogClose();
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const section = activeSection === 'claims' ? 'claimsreq' : activeSection;
      await axios.delete(`http://localhost:8000/${section}/${id}/`);
      if (activeSection === 'users') {
        setUsers(users.filter(user => user.id !== id));
      } else if (activeSection === 'claims') {
        setClaims(claims.filter(claim => claim.id !== id));
      } else {
        setSupportRequests(supportRequests.filter(req => req.id !== id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (data) => {
    setEditData(data);
    setOpenDialog(true);
  };

  const renderTable = () => {
    let data = [];
    switch (activeSection) {
      case 'users':
        data = users;
        break;
      case 'claims':
        data = claims;
        break;
      case 'support':
        data = supportRequests;
        break;
      default:
        data = [];
    }

    return (
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(data[0] || {}).map((key) => (
                <TableCell key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {Object.values(item).map((val, idx) => (
                  <TableCell key={idx}>{val}</TableCell>
                ))}
                <TableCell>
                  <IconButton color="primary" onClick={() => openEditDialog(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderDialogContent = () => {
    if (!editData) return null;
    return Object.keys(editData).map((key) => (
      <TextField
        key={key}
        margin="dense"
        label={key.charAt(0).toUpperCase() + key.slice(1)}
        fullWidth
        value={editData[key]}
        onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
      />
    ));
  };

  return (
    <Box className="admin-dashboard">
      <Box className="headeradmin">
        <Typography variant="h4" component="h1" className="dashboard-title">
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          className="adminlogout-button"
        >
          Logout
        </Button>
      </Box>
      <br></br>
      <Box className="adminmain-content">
        <Box className="sidebar-trigger" /> {/* Sidebar trigger area */}
        <Box className="sidebaradmin">
          <Button
            onClick={() => setActiveSection('users')}
            variant={activeSection === 'users' ? 'contained' : 'outlined'}
          >
            Users
          </Button>
          <Button
            onClick={() => setActiveSection('claims')}
            variant={activeSection === 'claims' ? 'contained' : 'outlined'}
          >
            Claims
          </Button>
          <Button
            onClick={() => setActiveSection('support')}
            variant={activeSection === 'support' ? 'contained' : 'outlined'}
          >
            Support Requests
          </Button>
        </Box>
        <Box className="contentadmin">
          {loading ? <CircularProgress /> : renderTable()}
          {/* Add chart below the table */}
          <Box className="chart-container">
            <Typography variant="h6" component="h2">
              Policy Chart
            </Typography>
            <Line data={chartData} />
          </Box>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{editData?.id ? 'Edit Data' : 'Add Data'}</DialogTitle>
        <DialogContent>
          {renderDialogContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEdit} color="primary">
            {editData?.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
