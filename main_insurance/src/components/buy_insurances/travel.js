import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Divider, TextField, Container, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
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

const TravelInsurance = () => {
  const [tripDuration, setTripDuration] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [premium, setPremium] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/payment/1');
  };

  const calculatePremium = () => {
    const durationFactor = 0.1;
    const coverageFactor = 0.05;

    const durationNum = parseInt(tripDuration, 10);
    const coverageNum = parseFloat(coverageAmount);

    if (isNaN(durationNum) || isNaN(coverageNum) || durationNum <= 0 || coverageNum <= 0) {
      alert('Please enter valid values for trip duration and coverage amount.');
      return;
    }

    const calculatedPremium = (durationNum * durationFactor) + (coverageNum * coverageFactor);
    setPremium(calculatedPremium.toFixed(2));
  };

  return (
    <div>
      <Header />
      <Chatbot />
      <Container maxWidth="lg">
        <Box padding={3}>
          <Typography variant="h3" gutterBottom align="center" color={redColor}>
            Travel Insurance Plans
          </Typography>
          <Grid container spacing={3} paddingBottom={10}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Single Trip Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Coverage for a single trip, including medical expenses, trip cancellations, and lost luggage.
                  </Typography>
                  <ButtonStyled variant="contained" onClick={handleClick}>
                    Apply Now
                  </ButtonStyled>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Multi-Trip Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Annual coverage for multiple trips, providing comprehensive protection throughout the year.
                  </Typography>
                  <ButtonStyled variant="contained" onClick={handleClick}>
                    Apply Now
                  </ButtonStyled>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Family Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Coverage for the entire family, including medical emergencies, trip interruptions, and more.
                  </Typography>
                  <ButtonStyled variant="contained" onClick={handleClick}>
                    Apply Now
                  </ButtonStyled>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          <DividerStyled />
          <br />

          <Typography variant="h4" gutterBottom align="center" color={redColor}>
            How to Make a Claim
          </Typography>
          <Grid container alignItems="center" justifyContent="center" spacing={3}>
            <Grid item xs={12} md={2}>
              <IconBox>
                <AssignmentTurnedInIcon fontSize="large" color={redColor} />
              </IconBox>
              <Typography variant="h6" color={redColor}>Notify Us</Typography>
              <Typography variant="body2" color="textSecondary">
                Inform us immediately after any incident by calling our 24/7 support.
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
              <Typography variant="h6" color={redColor}>Documentation</Typography>
              <Typography variant="body2" color="textSecondary">
                Submit the required documents for the claim process.
              </Typography>
            </Grid>

            <Grid item xs={12} md={1}>
              <ArrowLine>
                <ArrowForwardIosIcon color={redColor} />
              </ArrowLine>
            </Grid>

            <Grid item xs={12} md={2}>
              <IconBox>
                <FlightTakeoffIcon fontSize="large" color={redColor} />
              </IconBox>
              <Typography variant="h6" color={redColor}>Travel Assistance</Typography>
              <Typography variant="body2" color="textSecondary">
                Receive assistance for any travel-related issues.
              </Typography>
            </Grid>
          </Grid>
          <DividerStyled />
          <br />

          <Typography variant="h4" gutterBottom align="center" color={redColor}>
            Premium Calculator
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <PremiumCalculatorCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom color={redColor}>
                    Enter your trip details to calculate premium:
                  </Typography>
                  <TextField
                    label="Trip Duration (days)"
                    variant="outlined"
                    fullWidth
                    value={tripDuration}
                    onChange={(e) => setTripDuration(e.target.value)}
                    sx={{ marginBottom: '10px' }}
                  />
                  <TextField
                    label="Coverage Amount"
                    variant="outlined"
                    fullWidth
                    value={coverageAmount}
                    onChange={(e) => setCoverageAmount(e.target.value)}
                    sx={{ marginBottom: '10px' }}
                  />
                  <ButtonStyled variant="contained" onClick={calculatePremium}>
                    Calculate Premium
                  </ButtonStyled>
                  {premium && (
                    <Typography variant="h6" color={redColor} sx={{ marginTop: '10px' }}>
                      Estimated Premium: ${premium}
                    </Typography>
                  )}
                </CardContent>
              </PremiumCalculatorCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src="https://www.hdfcergo.com/images/default-source/health-insurance/ergo-health_7.jpg?sfvrsn=bde39d80_2" alt="Insurance Premium" width="100%" />
            </Grid>
          </Grid>

          <DividerStyled />
          <br />

          <Typography variant="h4" gutterBottom align="center" color={redColor}>
            Frequently Asked Questions
          </Typography>
          <FAQItem
            question="What is covered under travel insurance?"
            answer="Travel insurance typically covers trip cancellations, medical emergencies, lost luggage, and other unexpected events that might occur while you are traveling."
          />
          <FAQItem
            question="How do I make a claim?"
            answer="To make a claim, notify us as soon as an incident occurs, submit the required documents, and our team will assist you through the process."
          />
          <FAQItem
            question="Can I get coverage for a pre-existing condition?"
            answer="Some plans offer coverage for pre-existing conditions, but it depends on the specific policy. Please read the terms and conditions of your plan carefully."
          />
          <FAQItem
            question="Is travel insurance mandatory?"
            answer="While not mandatory in most cases, travel insurance is highly recommended to protect you from unforeseen events during your trip."
          />
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default TravelInsurance;
