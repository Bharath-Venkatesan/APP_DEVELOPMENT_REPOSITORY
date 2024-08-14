import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Backdrop,
} from '@mui/material';
import { styled } from '@mui/system';
import QRCode from 'qrcode.react';
import Footer from '../footer/footer';
import Header from '../header/header';


const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: 'auto',
  padding: 24,
  borderRadius: 12,
  boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.12)',
  backgroundColor: '#ffffff',
});

const PaymentOption = styled(Box)({
  padding: 16,
  border: '1px solid #e0e0e0',
  borderRadius: 8,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'scale(1.05)',
  },
  '&.selected': {
    border: '2px solid #1976d2',
    backgroundColor: '#e3f2fd',
  },
});

const PaymentOptionImage = styled('img')({
  width: 48,
  height: 48,
  marginBottom: 8,
  display: 'block',
  margin: 'auto',
});

const StyledButton = styled(Button)({
  background: 'linear-gradient(to right, #1976d2, #42a5f5)',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(to right, #1565c0, #1e88e5)',
  },
});

// Timer Component
const Timer = ({ initialTime, onTimeOut }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeOut();
      return;
    }
    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, onTimeOut]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Typography variant="h6" color="error" textAlign="center">
      Time Left: {formatTime(timeLeft)}
    </Typography>
  );
};

const PaymentPage = () => {
  const { id } = useParams(); 
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [activeStep, setActiveStep] = useState(0);
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');

  const steps = ['Select Method', 'Enter Details', 'Review & Pay'];
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeExpired(true);
      setError('Payment time expired. Please try again.');
    } else if (!timeExpired) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, timeExpired]);

  const handleTimeOut = () => {
    setTimeExpired(true);
    setError('Payment time expired. Please try again.');
  };

  const handlePayment = () => {
    if (timeExpired) {
      setError('Payment time has expired. Please refresh the page to try again.');
      return;
    }

    if (!paymentMethod || !amount) {
      setError('Please select a payment method and enter an amount.');
      return;
    }
    if (paymentMethod === 'QRCode' && !transactionId) {
      setError('Please enter the transaction ID.');
      return;
    }
    if (paymentMethod === 'CreditCard' && (!cardNumber || !expiryDate || !cvv)) {
      setError('Please enter all Credit / Debit card details.');
      return;
    }
    if (paymentMethod === 'UPI' && !upiId) {
      setError('Please enter your UPI ID.');
      return;
    }
    if (paymentMethod === 'BankTransfer' && (!bankAccountNumber || !bankName || !bankIfsc)) {
      setError('Please enter all bank details.');
      return;
    }
    setActiveStep(2); // Move to review step
  };

  const handlePaymentMethodClick = (method) => {
    setPaymentMethod(method);
    setError(''); // Clear any previous errors
    setCardNumber(''); // Clear card details
    setExpiryDate('');
    setCvv('');
    setUpiId(''); // Clear UPI ID
    setTransactionId(''); // Clear transaction ID
    setBankAccountNumber(''); // Clear bank details
    setBankName('');
    setBankIfsc('');
    setActiveStep(1); // Move to enter details step
    setOpenDialog(true); // Show credentials dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmPayment = () => {
    setLoading(true);
    setError('');
    setOpenDialog(false);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setOpenSnackbar(true); // Show success snackbar
      
      // Navigate to the home page after the success snackbar is shown
      setTimeout(() => {
        navigate('/home');
      }, 3000); // Adjust time as needed to match the duration of the snackbar display
    }, 3000); // Simulate payment processing time
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleQRCodeDownload = () => {
    const canvas = document.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `QRCode-${id}.png`;
    link.click();
  };

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Header />
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', marginTop: '2%' }}>
        Make Your Payment
      </Typography>

      <Timer initialTime={timeLeft} onTimeOut={handleTimeOut} />

      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Payment Details
              </Typography>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ marginTop: '8px' }}>
                  {error}
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Select Payment Method
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <PaymentOption
                    onClick={() => handlePaymentMethodClick('CreditCard')}
                    className={paymentMethod === 'CreditCard' ? 'selected' : ''}
                  >
                    <PaymentOptionImage src="https://cdn0.iconfinder.com/data/icons/major-credit-cards-colored/48/JD-15-512.png" alt="Credit Card" />
                    <Typography variant="body1">Credit / Debit Card</Typography>
                  </PaymentOption>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PaymentOption
                    onClick={() => handlePaymentMethodClick('UPI')}
                    className={paymentMethod === 'UPI' ? 'selected' : ''}
                  >
                    <PaymentOptionImage src="https://img.icons8.com/fluent/200/bhim.png" alt="UPI" />
                    <Typography variant="body1">UPI</Typography>
                  </PaymentOption>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PaymentOption
                    onClick={() => handlePaymentMethodClick('QRCode')}
                    className={paymentMethod === 'QRCode' ? 'selected' : ''}
                  >
                    <PaymentOptionImage src="https://cdn-icons-png.flaticon.com/128/5628/5628131.png" alt="QR Code" />
                    <Typography variant="body1">QR Code</Typography>
                  </PaymentOption>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PaymentOption
                    onClick={() => handlePaymentMethodClick('BankTransfer')}
                    className={paymentMethod === 'BankTransfer' ? 'selected' : ''}
                  >
                    <PaymentOptionImage src="https://cdn2.iconfinder.com/data/icons/essentials-bigdark/100/Artboard_158-512.png" alt="Bank Transfer" />
                    <Typography variant="body1">Bank Transfer</Typography>
                  </PaymentOption>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PaymentOption
                    onClick={() => handlePaymentMethodClick('PayPal')}
                    className={paymentMethod === 'PayPal' ? 'selected' : ''}
                  >
                    <PaymentOptionImage src="https://cdn-icons-png.flaticon.com/128/888/888870.png" alt="PayPal" />
                    <Typography variant="body1">PayPal</Typography>
                  </PaymentOption>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PaymentOption
                    onClick={() => handlePaymentMethodClick('GooglePay')}
                    className={paymentMethod === 'GooglePay' ? 'selected' : ''}
                  >
                    <PaymentOptionImage src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="Google Pay" />
                    <Typography variant="body1">Google Pay</Typography>
                  </PaymentOption>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PaymentOption
                    onClick={() => handlePaymentMethodClick('ApplePay')}
                    className={paymentMethod === 'ApplePay' ? 'selected' : ''}
                  >
                    <PaymentOptionImage src="https://cdn-icons-png.flaticon.com/128/5977/5977576.png" alt="Apple Pay" />
                    <Typography variant="body1">Apple Pay</Typography>
                  </PaymentOption>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <StyledButton fullWidth onClick={handlePayment}>
                {activeStep === 0 ? 'Proceed to Enter Details' : 'Review & Pay'}
              </StyledButton>
            </CardActions>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Payment Details Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Enter {paymentMethod} Details</DialogTitle>
        <DialogContent>
          {paymentMethod === 'CreditCard' && (
            <Box>
              <TextField
                fullWidth
                label="Card Number"
                margin="normal"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <TextField
                fullWidth
                label="Expiry Date"
                margin="normal"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              <TextField
                fullWidth
                label="CVV"
                margin="normal"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </Box>
          )}

          {paymentMethod === 'UPI' && (
            <TextField
              fullWidth
              label="UPI ID"
              margin="normal"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}

          {paymentMethod === 'QRCode' && (
            <Box textAlign="center">
              <QRCode value={`Payment ID: ${id}`} />
              <Button onClick={handleQRCodeDownload}>Download QR Code</Button>
              <TextField
                fullWidth
                label="Transaction ID"
                margin="normal"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </Box>
          )}

          {paymentMethod === 'BankTransfer' && (
            <Box>
              <TextField
                fullWidth
                label="Bank Account Number"
                margin="normal"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
              />
              <TextField
                fullWidth
                label="Bank Name"
                margin="normal"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              <TextField
                fullWidth
                label="IFSC Code"
                margin="normal"
                value={bankIfsc}
                onChange={(e) => setBankIfsc(e.target.value)}
              />
            </Box>
          )}

          {paymentMethod === 'PayPal' && (
            <TextField
              fullWidth
              label="PayPal Email"
              margin="normal"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}

          {paymentMethod === 'GooglePay' && (
            <TextField
              fullWidth
              label="Google Pay ID"
              margin="normal"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}

          {paymentMethod === 'ApplePay' && (
            <TextField
              fullWidth
              label="Apple Pay ID"
              margin="normal"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <StyledButton onClick={handleConfirmPayment}>Confirm Payment</StyledButton>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Payment Successful!
        </Alert>
      </Snackbar>

      <Backdrop open={loading} sx={{ color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Footer />
    </Box>
  );
};

export default PaymentPage;
