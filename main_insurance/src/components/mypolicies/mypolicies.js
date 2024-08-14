import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
    IconButton,
    TextField,
    Snackbar,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PaymentIcon from '@mui/icons-material/Payment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import Chatbot from '../chatbot/chatbot';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: 'calc(100vh - 150px)',
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&:hover': {
        color: theme.palette.secondary.main,
    },
}));

const StyledSearchBar = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    width: '100%',
}));

const MyPolicies = () => {
    const [policies, setPolicies] = useState([]);
    const [filteredPolicies, setFilteredPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [dialogAction, setDialogAction] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await fetch('http://localhost:8000/mypolicies/');
                const contentType = response.headers.get("content-type");

                if (response.ok && contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();
                    setPolicies(data);
                    setFilteredPolicies(data);
                } else {
                    const text = await response.text();
                    console.log("Non-JSON response:", text);
                    throw new Error("Response is not JSON");
                }
            } catch (error) {
                console.error('Error fetching policies:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    useEffect(() => {
        const results = policies.filter(policy =>
            policy.policy_number.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPolicies(results);
    }, [searchTerm, policies]);

    const handleActionClick = (policy, action) => {
        setSelectedPolicy(policy);
        setDialogAction(action);
        setOpenDialog(true);
    };
    
    const handleDialogClose = async (confirm) => {
        setOpenDialog(false);
        if (confirm && dialogAction === 'pay') {
            navigate(`/payment/${selectedPolicy.id}`);  // Updated to include policy ID
            toast.success('Redirecting to payment page...');
        } else if (confirm && dialogAction === 'surrender') {
            try {
                const response = await fetch(`http://localhost:8000/policies/${selectedPolicy.id}/surrender/`, {
                    method: 'POST',
                });
    
                if (response.ok) {
                    setPolicies((prevPolicies) =>
                        prevPolicies.map((policy) =>
                            policy.id === selectedPolicy.id
                                ? { ...policy, status: 'Surrendered' }
                                : policy
                        )
                    );
                    setSnackbarMessage(`Policy ${selectedPolicy.policy_number} has been surrendered.`);
                    setSnackbarOpen(true);
                } else {
                    const errorData = await response.json();
                    toast.error(`Failed to surrender policy: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error surrendering policy:', error);
                toast.error('An error occurred while surrendering the policy.');
            }
        }
    };
    

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box p={0}>
            <Header />
            <StyledSearchBar
            style={{width:'1500px', alignItems:'flex-end', marginTop:'2%'}}
                variant="outlined"
                placeholder="Search by Policy Number"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />
            <Chatbot/>
            <StyledTableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Policy Number</TableCell>
                            <TableCell>Policy Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Policy Value</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPolicies.length > 0 ? (
                            filteredPolicies.map((policy) => (
                                <StyledTableRow key={policy.id}>
                                    <TableCell>{policy.policy_number}</TableCell>
                                    <TableCell>{policy.policy_type}</TableCell>
                                    <TableCell>{policy.claim_amount ? `$${policy.claim_amount}` : 'N/A'}</TableCell>
                                    <TableCell>{policy.status || 'N/A'}</TableCell>
                                    <TableCell>{policy.policy_value ? `Rs. ${policy.policy_value}` : 'N/A'}</TableCell>
                                    <TableCell>
                                        {policy.status !== 'Surrendered' && (
                                            <>
                                                <Tooltip title="Pay Premium">
                                                    <StyledIconButton onClick={() => handleActionClick(policy, 'pay')}>
                                                        <PaymentIcon />
                                                    </StyledIconButton>
                                                </Tooltip>
                                                <Tooltip title="Surrender Policy">
                                                    <StyledIconButton onClick={() => handleActionClick(policy, 'surrender')}>
                                                        <DeleteForeverIcon />
                                                    </StyledIconButton>
                                                </Tooltip>
                                            </>
                                        )}
                                    </TableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">No policies found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </StyledTableContainer>

            <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
                <DialogTitle>{dialogAction === 'pay' ? 'Confirm Payment' : 'Confirm Surrender'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to {dialogAction === 'pay' ? 'pay the premium for' : 'surrender'} policy {selectedPolicy?.policy_number}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose(false)} color="primary">Cancel</Button>
                    <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                action={
                    <Button color="inherit" onClick={() => setSnackbarOpen(false)}>
                        Close
                    </Button>
                }
            />

            <ToastContainer />
            <br></br>
            <Footer />
        </Box>
    );
};

export default MyPolicies;
