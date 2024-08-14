import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, TextField, Button, Grid, Card, CardContent, CardActions,
  Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Snackbar,
  IconButton, Tooltip, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { Close as CloseIcon } from '@mui/icons-material';
import Header from '../header/header';
import Footer from '../footer/footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend } from 'recharts';
import Sidebar from '../sidebar/sidebar';
import Chatbot from '../chatbot/chatbot';


const ClaimsPage = () => {
  const [policyNumber, setPolicyNumber] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [username, setUsername] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [message, setMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {

    let updatedClaims = [...claims];
    
    if (filterType) {
      updatedClaims = updatedClaims.filter(claim => claim.policy_type === filterType);
    }

    if (sortOrder) {
      updatedClaims.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.claim_amount - b.claim_amount;
        } else {
          return b.claim_amount - a.claim_amount;
        }
      });
    }

    setFilteredClaims(updatedClaims);
  }, [claims, filterType, sortOrder]);

  const handleAddClaim = async () => {
    setLoading(true);
    console.log('Submitting Claim:', { username, policyNumber, policyType, claimAmount });
    try {
      await axios.post('http://localhost:8000/claimsreq/', {
        username,
        policy_number: policyNumber,
        policy_type: policyType,
        claim_amount: claimAmount
      });
      setMessage('Claim added successfully!');
      setSnackbarOpen(true);
      setPolicyNumber('');
      setClaimAmount('');
      setPolicyType('');
      setOpenDialog(false);
    } catch (error) {
      setMessage('Error adding claim: ' + (error.response ? error.response.data : error.message));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClaims = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/claimsreq/?username=${username}`);
      setClaims(response.data);
      setMessage(response.data.length === 0 ? 'No claims found for this username.' : '');
    } catch (error) {
      setMessage('Error fetching claims: ' + (error.response ? error.response.data : error.message));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const chartData = filteredClaims.reduce((acc, claim) => {
    const existing = acc.find(item => item.policy_number === claim.policy_number);
    if (existing) {
      existing.claim_amount += claim.claim_amount;
    } else {
      acc.push({ policy_number: claim.policy_type, claim_amount: claim.claim_amount });
    }
    return acc;
  }, []);

  return (
    <Box>
      <Chatbot/>
      <Header />
      <Box display="flex">
        <Sidebar 
          filterType={filterType}
          setFilterType={setFilterType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <Box p={4} flex={1}>
          <Typography variant="h4" align="center" gutterBottom>
            Claims Management
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Add New Claim
                  </Typography>
                  <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Policy Number"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Policy Type</InputLabel>
                    <Select
                      value={policyType}
                      onChange={(e) => setPolicyType(e.target.value)}
                      label="Policy Type"
                    >
                      <MenuItem value="Life Insurance">Life Insurance</MenuItem>
                      <MenuItem value="Health Insurance">Health Insurance</MenuItem>
                      <MenuItem value="Pet Insurance">Pet Insurance</MenuItem>
                      <MenuItem value="Car Insurance">Car Insurance</MenuItem>
                      <MenuItem value="Travel Insurance">Travel Insurance</MenuItem>
                      <MenuItem value="Bike Insurance">Bike Insurance</MenuItem>
                      <MenuItem value="Home Insurance">Home Insurance</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Claim Amount"
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <CardActions>
                    <Tooltip title="Submit your claim">
                      <Button onClick={() => setOpenDialog(true)} variant="contained" color="primary" fullWidth sx={{backgroundColor:'red'}}>
                        Submit Claim
                      </Button>
                    </Tooltip>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Search Claims
                  </Typography>
                  <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <CardActions>
                    <Tooltip title="Search for claims">
                      <Button onClick={handleSearchClaims} variant="contained" color="secondary" fullWidth sx={{backgroundColor:'red'}}>
                        Search
                      </Button>
                    </Tooltip>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {loading && (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          )}

          {filteredClaims.length > 0 ? (
            <>
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Claims Found:
                </Typography>
                <Grid container spacing={3}>
                  {filteredClaims.map((claim) => (
                    <Grid item xs={12} sm={6} md={4} key={claim.id}>
                      <Card elevation={2}>
                        <CardContent>
                          <Typography variant="body1">
                            <strong>Policy Number:</strong> {claim.policy_number}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Policy Type:</strong> {claim.policy_type}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Amount:</strong> Rs.{claim.claim_amount}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Claims Summary
                </Typography>
                <Box display="flex" justifyContent="center">
                  <BarChart
                    width={800}
                    height={400}
                    data={chartData}
                    margin={{ top: 20, right: 30, bottom: 5, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="policy_number" />
                    <YAxis />
                    <ChartTooltip />
                    <Legend />
                    <Bar dataKey="claim_amount" fill="#8884d8" />
                  </BarChart>
                </Box>
              </Box>
            </>
          ) : message && (
            <Box mt={4} textAlign="center">
              <Typography variant="body1" color="textSecondary">
                {message}
              </Typography>
            </Box>
          )}

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Claim Submission</DialogTitle>
            <DialogContent>
              <Typography variant="body1">Are you sure you want to submit this claim?</Typography>
              <Typography variant="body2"><strong>Policy Number:</strong> {policyNumber}</Typography>
              <Typography variant="body2"><strong>Policy Type:</strong> {policyType}</Typography>
              <Typography variant="body2"><strong>Requested Amount:</strong> Rs.{claimAmount}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleAddClaim} variant="contained" color="primary" disabled={loading}>
                {loading ? 'Processing...' : 'Confirm'}
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert
              onClose={handleSnackbarClose}
              severity={message.includes('Error') ? 'error' : 'success'}
              action={
                <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              {message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ClaimsPage;
