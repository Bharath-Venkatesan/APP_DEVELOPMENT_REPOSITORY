import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Divider, TextField, Container, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
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

const HealthInsurance = () => {
  const [age, setAge] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [premium, setPremium] = useState(null);
  
  const navigate = useNavigate();
  const handleclick = () =>
    {
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
      <Header/>
      <Chatbot/>
      <Container maxWidth="lg">
        <Box padding={3}>
          <Typography variant="h3" gutterBottom align="center" color={redColor}>
            Health Insurance Plans
          </Typography>
          <Grid container spacing={3} paddingBottom={10}>
            <Grid item xs={12} md={3}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Basic Health Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Covers essential health services and hospital visits.
                  </Typography>
                  <ButtonStyled variant="contained" onClick={handleclick}>
                    Apply Now
                  </ButtonStyled>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Comprehensive Health Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Includes additional coverage for specialist visits and medications.
                  </Typography>
                  <ButtonStyled variant="contained" onClick={handleclick}>
                    Apply Now
                  </ButtonStyled>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Family Health Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Covers entire family with additional benefits.
                  </Typography>
                    <br></br>
                    <ButtonStyled variant="contained" onClick={handleclick}>
                    Apply Now
                  </ButtonStyled>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Senior Health Plan
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Special plan for seniors with additional health services.
                  </Typography>
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
              <Typography variant="h6" color={redColor}>Intimation</Typography>
              <Typography variant="body2" color="textSecondary">
                Fill up the pre-auth form at the network hospital for cashless approval.
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
                Once the hospital intimates us, we send you the status update.
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
              <Typography variant="h6" color={redColor}>Hospitalisation</Typography>
              <Typography variant="body2" color="textSecondary">
                Hospitalisation can be done on the basis of pre-auth approval.
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
              <Typography variant="h6" color={redColor}>Reimbursement</Typography>
              <Typography variant="body2" color="textSecondary">
                Submit your reimbursement claim and get the amount directly in your account.
              </Typography>
            </Grid>
          </Grid>

          <DividerStyled />

          <br></br>
          <Typography variant="h4" gutterBottom align="center" color={redColor}>
            Premium Calculator
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <PremiumCalculatorCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom color={redColor}>
                    Enter your details to calculate premium:
                  </Typography>
                  <TextField
                    label="Age"
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

          <br></br>
          <Typography variant="h4" gutterBottom align="center" color={redColor}>
            Frequently Asked Questions
          </Typography>
          <FAQItem question="What does health insurance cover?" answer="Health insurance typically covers medical expenses, hospital stays, surgeries, and sometimes prescription drugs." />
          <FAQItem question="How do I choose the right health insurance plan?" answer="Consider factors like coverage needs, budget, network hospitals, and any additional benefits offered by the plan." />
          <FAQItem question="What is the waiting period for pre-existing conditions?" answer="The waiting period varies, but it's usually between 2 to 4 years, depending on the policy and insurer." />
          <FAQItem question="Can I port my existing health insurance policy?" answer="Yes, you can port your health insurance policy to another insurer without losing the continuity benefits, subject to certain conditions." />

        </Box>
      </Container>
      <Footer/>
    </div>
  );
};

export default HealthInsurance;
