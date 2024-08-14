import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Divider, TextField, Container, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Footer from '../footer/footer';
import Header from '../header/header';
import Chatbot from '../chatbot/chatbot';
import { useNavigate } from 'react-router-dom';

const redColor = '#d32f2f';
const lightRedColor = 'white';

const StyledCard = styled(Card)({
  margin: '10px 0',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
  transition: '0.3s',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: lightRedColor,
  '&:hover': {
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-5px)',
  },
});

const PremiumCalculatorCard = styled(Card)({
  margin: '10px 0',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9',
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-5px)',
  },
});

const DividerStyled = styled(Divider)({
  margin: '30px 0',
  backgroundColor: redColor,
});

const ButtonStyled = styled(Button)({
  borderRadius: '20px',
  padding: '10px 20px',
  fontWeight: 'bold',
  marginTop: '10px',
  backgroundColor: redColor,
  color: '#fff',
  '&:hover': {
    backgroundColor: '#b71c1c',
  },
});

const FAQCard = styled(StyledCard)({
  backgroundColor: '#f0f0f0',
});



const IconBox = styled(Box)({
  borderRadius: '50%',
  padding: '20px',
  backgroundColor: lightRedColor,
  marginBottom: '10px',
  display: 'inline-block',
});

const ArrowLine = styled(Box)({
  textAlign: 'center',
  marginTop: '15px',
});

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <FAQCard>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" onClick={toggleOpen} sx={{ cursor: 'pointer' }}>
          <Typography variant="h6" color={redColor}>
            {question}
          </Typography>
          <IconButton>
            {open ? <RemoveIcon style={{ color: redColor }} /> : <AddIcon style={{ color: redColor }} />}
          </IconButton>
        </Box>
        <Collapse in={open}>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
            {answer}
          </Typography>
        </Collapse>
      </CardContent>
    </FAQCard>
  );
};

const CarInsurance = () => {
  const [age, setAge] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [premium, setPremium] = useState(null);

  const navigate = useNavigate();
  const handleclick = () => {
    navigate('/payment/1')
  }
  const calculatePremium = () => {
    const ageFactor = 0.05;
    const coverageFactor = 0.02;

    const ageNum = parseInt(age, 10);
    const coverageNum = parseFloat(coverageAmount);

    if (isNaN(ageNum) || isNaN(coverageNum) || ageNum <= 0 || coverageNum <= 0) {
      alert('Please enter valid values for age and coverage amount.');
      return;
    }

    const calculatedPremium = (ageNum * ageFactor) + (coverageNum * coverageFactor);
    setPremium(calculatedPremium.toFixed(2));
  };

  return (
    <div>
      <Header />
      <Chatbot />
      <Container maxWidth="lg">
        <Box padding={3}>
          <Typography variant="h3" gutterBottom align="center" color={redColor}>
            Car Insurance Plans
          </Typography>
          <Grid container spacing={3} paddingBottom={10}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Basic Car Insurance
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Covers third-party liability and damages to your vehicle.
                  </Typography>
                  <ButtonStyled variant="contained" onClick={handleclick}>
                    Apply Now
                  </ButtonStyled>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Comprehensive Car Insurance
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Includes additional coverage for theft, natural disasters, and accidents.
                  </Typography>
                  <ButtonStyled variant="contained" onClick={handleclick}>
                    Apply Now
                  </ButtonStyled>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Zero Depreciation Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Covers the full cost of replacing car parts without depreciation deduction.
                  </Typography>
                  <br></br>
                  <ButtonStyled variant="contained" onClick={handleclick}>
                    Apply Now
                  </ButtonStyled>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          <DividerStyled />
          <br></br>
          <Typography variant="h4" gutterBottom align="center" color={redColor}>
            How to Make a Claim
          </Typography>
          <Grid container alignItems="center" justifyContent="center" spacing={3}>
            <Grid item xs={12} md={2}>
              <IconBox>
                <AssignmentTurnedInIcon fontSize="large" color={redColor} />
              </IconBox>
              <Typography variant="h6" color={redColor}>Report Incident</Typography>
              <Typography variant="body2" color="textSecondary">
                Notify the insurance company immediately after the incident.
              </Typography>
            </Grid>

            <Grid item xs={12} md={1}>
              <ArrowLine>
                <ArrowForwardIosIcon color={redColor} />
              </ArrowLine>
            </Grid>

            <Grid item xs={12} md={2}>
              <IconBox>
                <VerifiedIcon fontSize="large" color={redColor} />
              </IconBox>
              <Typography variant="h6" color={redColor}>Inspection & Approval</Typography>
              <Typography variant="body2" color="textSecondary">
                An inspector will assess the damage and the claim will be processed.
              </Typography>
            </Grid>

            <Grid item xs={12} md={1}>
              <ArrowLine>
                <ArrowForwardIosIcon color={redColor} />
              </ArrowLine>
            </Grid>

            <Grid item xs={12} md={2}>
              <IconBox>
                <DirectionsCarIcon fontSize="large" color={redColor} />
              </IconBox>
              <Typography variant="h6" color={redColor}>Repair</Typography>
              <Typography variant="body2" color="textSecondary">
                Get your car repaired at an authorized service center.
              </Typography>
            </Grid>

            <Grid item xs={12} md={1}>
              <ArrowLine>
                <ArrowForwardIosIcon color={redColor} />
              </ArrowLine>
            </Grid>

            <Grid item xs={12} md={2}>
              <IconBox>
                <AssignmentTurnedInIcon fontSize="large" color={redColor} />
              </IconBox>
              <Typography variant="h6" color={redColor}>Claim Settlement</Typography>
              <Typography variant="body2" color="textSecondary">
                Submit the bills and get the claim amount credited to your account.
              </
              Typography>
            </Grid>
          </Grid>


          <DividerStyled />
          <br />

          <Typography variant="h4" gutterBottom align="center" color={redColor}>
            Premium Calculator
          </Typography>
          <br></br>

          <Grid container spacing={3} paddingBottom={10}>
            <Grid item xs={12} md={6}>
              <PremiumCalculatorCard>
                <Typography variant="h5" gutterBottom color={redColor}>
                  Calculate Your Premium
                </Typography>
                <TextField
                  label="Model of Car"
                  variant="outlined"
                  fullWidth
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Coverage Amount"
                  variant="outlined"
                  fullWidth
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(e.target.value)}
                  margin="normal"
                />
                <ButtonStyled variant="contained" onClick={calculatePremium} fullWidth>
                  Calculate
                </ButtonStyled>
                {premium && (
                  <Typography variant="h6" color={redColor} sx={{ marginTop: 2 }}>
                    Your Estimated Premium: ${premium}
                  </Typography>
                )}
              </PremiumCalculatorCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src="https://www.hdfcergo.com/images/default-source/health-insurance/ergo-health_7.jpg?sfvrsn=bde39d80_2" alt="Insurance Premium" width="100%" />
            </Grid>
          </Grid>
          <DividerStyled />

          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom align="center" color={redColor}>
              Frequently Asked Questions
            </Typography>
            <FAQItem question="What is covered under Comprehensive Car Insurance?" answer="Comprehensive Car Insurance covers damages to your vehicle due to accidents, theft, natural disasters, and third-party liabilities." />
            <FAQItem question="How do I file a claim?" answer="To file a claim, notify your insurance provider immediately after the incident, follow their instructions for inspection, and submit the required documents." />
            <FAQItem question="Can I transfer my No Claim Bonus?" answer="Yes, you can transfer your No Claim Bonus when you switch your car insurance policy to a new insurer." />
          </Grid>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default CarInsurance;