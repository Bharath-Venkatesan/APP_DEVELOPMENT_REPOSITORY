import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';
import Footer from '../footer/footer';
import Header from '../header/header';
import Chatbot from '../chatbot/chatbot';

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
  alignItems: 'center', // Center alignment
  justifyContent: 'center', // Center alignment
  textAlign: 'center', // Center text
  backgroundColor: lightRedColor,
  '&:hover': {
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-5px)',
  },
});

const DividerStyled = styled(Divider)({
  margin: '30px 0',
  backgroundColor: redColor,
});

const TimelineContainer = styled(Box)({
  position: 'relative',
  padding: '20px 0',
});

const TimelineBlock = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center alignment
  textAlign: 'center',
  padding: '10px 0',
  width: '100%',
  '&:not(:last-child)': {
    marginBottom: '40px',
  },
});

const TimelineDot = styled(Box)({
  position: 'absolute',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: redColor,
  top: '0',
  left: 'calc(50% - 6px)',
  transform: 'translateX(-50%)',
  zIndex: 1,
});

const TimelineConnector = styled(Box)({
  position: 'absolute',
  width: '2px',
  height: '100%',
  backgroundColor: redColor,
  left: '50%',
  transform: 'translateX(-50%)',
});

const TimelineContent = styled(Paper)({
  padding: '15px 30px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f5f5f5',
  position: 'relative',
  zIndex: 1,
  maxWidth: '80%',
  margin: '0 auto',
  textAlign: 'center', // Center text
});

const AboutUs = () => {
  return (
    <div>
      <Header />
      <Chatbot />
      <Container maxWidth="lg">
        <Box padding={3}>
          <Typography variant="h3" gutterBottom align="center" color={redColor}>
            About Us
          </Typography>
          <Grid container spacing={3} paddingBottom={10}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Our mission is to provide high-quality insurance solutions that offer peace of mind and protection against unexpected events.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Our Vision
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    We envision becoming the leading provider of comprehensive insurance plans that cater to all our customers' needs.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom color={redColor}>
                    Our Values
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Integrity, customer-centricity, and innovation are the core values that drive us in delivering the best insurance services.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          <DividerStyled />
          <br />

          <Typography variant="h4" gutterBottom align="center" color={redColor}>
            Our Timeline
          </Typography>
          <TimelineContainer>
            <TimelineConnector />
            <TimelineBlock>
              <TimelineDot style={{marginLeft:'6px'}}/>
              <TimelineContent>
                <Typography variant="h6" color={redColor}>
                  2020
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Our company was founded with a mission to revolutionize the insurance industry.
                </Typography>
              </TimelineContent>
            </TimelineBlock>
            <TimelineBlock>
            <TimelineDot style={{marginLeft:'6px'}}/>
              <TimelineContent>
                <Typography variant="h6" color={redColor}>
                  2021
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  We launched our first suite of insurance products and services.
                </Typography>
              </TimelineContent>
            </TimelineBlock>
            <TimelineBlock>
              {/* <TimelineDot /> */}
              <TimelineContent>
                <Typography variant="h6" color={redColor}>
                  2022
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Expanded our offerings and reached new markets with innovative solutions.
                </Typography>
              </TimelineContent>
            </TimelineBlock>
            <TimelineBlock>
              {/* <TimelineDot /> */}
              <TimelineContent>
                <Typography variant="h6" color={redColor}>
                  2023
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Celebrated significant milestones and continued to enhance customer experience.
                </Typography>
              </TimelineContent>
            </TimelineBlock>
          </TimelineContainer>

          <DividerStyled />
          <br />

          <Typography variant="h4" gutterBottom align="center" color={redColor}>
            OUR HEADQUATERS
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center">
            C3 - 27, SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY, COIMBATORE, TAMILNADU
            <br />
            <strong>Email:</strong> support@insuranceapp.com
            <br />
            <strong>Phone:</strong> (+91) 7540007149
          </Typography>

          <DividerStyled />
          <br />
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutUs;
