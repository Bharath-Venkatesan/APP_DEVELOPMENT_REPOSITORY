import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Divider, TextField, Container, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
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

const HomeInsurance = () => {
  const [homeValue, setHomeValue] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [premium, setPremium] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/payment/1');
  };

  const calculatePremium = () => {
    const valueFactor = 0.01;
    const coverageFactor = 0.02;

    const valueNum = parseFloat(homeValue);
    const coverageNum = parseFloat(coverageAmount);

    if (isNaN(valueNum) || isNaN(coverageNum) || valueNum <= 0 || coverageNum <= 0) {
      alert('Please enter valid values for home value and coverage amount.');
      return;
    }

    const calculatedPremium = (valueNum * valueFactor) + (coverageNum * coverageFactor);
    setPremium(calculatedPremium.toFixed(2));
  };

  return (
    <div>
      <Header />
      <Chatbot />
      <Container maxWidth="lg">
        <Box padding={3}>
          <Typography variant="h3" gutterBottom align="center" color={redColor}>
            Home Insurance Plans
          </Typography>
          <Grid container spacing={3} paddingBottom={10}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Basic Coverage
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Basic coverage for your home including protection against fire, theft, and natural disasters.
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
                    Comprehensive Coverage
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Extensive coverage including protection against all basic risks plus liability, accidental damage, and more.
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
                    Premium Coverage
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    All-inclusive coverage offering protection against all risks plus high-value items and additional benefits.
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
                Report any damage or loss to us as soon as possible through our 24/7 helpline.
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
              <Typography variant="h6" color={redColor}>Assessment</Typography>
              <Typography variant="body2" color="textSecondary">
                We will assess the damage and determine the claim amount.
              </Typography>
            </Grid>

            <Grid item xs={12} md={1}>
              <ArrowLine>
                <ArrowForwardIosIcon color={redColor} />
              </ArrowLine>
            </Grid>

            <Grid item xs={12} md={2}>
              <IconBox>
                <HomeIcon fontSize="large" color={redColor} />
              </IconBox>
              <Typography variant="h6" color={redColor}>Repair & Replacement</Typography>
              <Typography variant="body2" color="textSecondary">
                We will cover the cost of repairs or replacements as per your policy terms.
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
                    Enter your home details to calculate premium:
                  </Typography>
                  <TextField
                    label="Home Value"
                    variant="outlined"
                    fullWidth
                    value={homeValue}
                    onChange={(e
                    ) => setHomeValue(e.target.value)}
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
            question="What is covered under home insurance?"
            answer="Home insurance typically covers damages to the home structure, personal property, and liability for accidents that occur on your property."
          />
          <FAQItem
            question="How do I file a claim?"
            answer="To file a claim, report the damage to us immediately, submit the necessary documentation, and our team will guide you through the process."
          />
          <FAQItem
            question="Does home insurance cover natural disasters?"
            answer="Coverage for natural disasters depends on your policy. Please check your policy details for specific coverage information."
          />
          <FAQItem
            question="Is home insurance required by law?"
            answer="Home insurance is not legally required, but it is highly recommended to protect your home and personal belongings."
          />
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default HomeInsurance;