import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Divider, TextField, Container, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import PetsIcon from '@mui/icons-material/Pets';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
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

const PetInsurance = () => {
  const [age, setAge] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [premium, setPremium] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/payment/1');
  };

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
            Pet Insurance Plans
          </Typography>
          <Grid container spacing={3} paddingBottom={10}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Dog Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Comprehensive coverage for dogs including routine check-ups, vaccinations, and emergency care.
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
                    Cat Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Extensive coverage for cats covering preventive care, surgeries, and chronic conditions.
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
                    Exotic Pets Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Tailored insurance for exotic pets like reptiles, birds, and small mammals.
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
              <Typography variant="h6" color={redColor}>Intimation</Typography>
              <Typography variant="body2" color="textSecondary">
                Fill up the claim form at the veterinary clinic for direct billing approval.
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
              <Typography variant="h6" color={redColor}>Approval/Rejection</Typography>
              <Typography variant="body2" color="textSecondary">
                Once the clinic intimates us, we send you the status update.
              </Typography>
            </Grid>

            <Grid item xs={12} md={1}>
              <ArrowLine>
                <ArrowForwardIosIcon color={redColor} />
              </ArrowLine>
            </Grid>

            <Grid item xs={12} md={2}>
              <IconBox>
                <PetsIcon fontSize="large" color={redColor} />
              </IconBox>
              <Typography variant="h6" color={redColor}>Treatment</Typography>
              <Typography variant="body2" color="textSecondary">
                Veterinary treatment starts based on policy coverage.
              </Typography>
            </Grid>

            <Grid item xs={12} md={1}>
              <ArrowLine>
                <ArrowForwardIosIcon color={redColor} />
              </ArrowLine>
            </Grid>

            <Grid item xs={12} md={2}>
              <IconBox>
                <LocalHospitalIcon fontSize="large" color={redColor} />
              </IconBox>
              <Typography variant="h6" color={redColor}>Hospitalization</Typography>
              <Typography variant="body2" color="textSecondary">
                If hospitalization is required, policy coverage is applied.
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
                    Enter your details of your pet to calculate premium:
                  </Typography>
                  <TextField
                    label="Pet's Age"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <TextField
                    label="Coverage Amount"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={coverageAmount}
                    onChange={(e) => setCoverageAmount(e.target.value)}
                  />
                  <ButtonStyled variant="contained" fullWidth onClick={calculatePremium}>
                    Calculate Premium
                  </ButtonStyled>
                  {premium !== null && (
                    <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
                      Estimated Premium: Rs. {premium}
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
            question="What is covered under pet insurance?"
            answer="Our pet insurance plans cover a wide range of services including veterinary consultations, surgeries, medications, and more. Specific coverage may vary based on the plan you choose."
          />
          <FAQItem
            question="Can I insure multiple pets?"
            answer="Yes, our Family Pet Plan allows you to insure multiple pets under a single policy with additional benefits."
          />
          <FAQItem
            question="How do I make a claim?"
            answer="To make a claim, fill out the claim form at your veterinary clinic, and we will handle the rest. You will receive updates on the approval status via email or SMS."
          />

        </Box> {/* Correct closing tag for <Box> */}
      </Container>
      <Footer />
    </div>
  );
};

export default PetInsurance;
