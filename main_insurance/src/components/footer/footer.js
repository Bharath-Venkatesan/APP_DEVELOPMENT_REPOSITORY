import React from 'react';
import { Container, Grid, Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              InsuranceApp
            </Typography>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} insuranceApp. All rights reserved.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              At InsuranceApp, our mission is to provide exceptional service and 
              support to all of our clients. We strive to create solutions that 
              empower individuals and businesses to achieve their goals. Whether 
              you're looking for comprehensive insurance coverage, expert advice, 
              or customer support, we're here to help you every step of the way.
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Our team is dedicated to continuous improvement, innovation, and 
              maintaining the highest standards of integrity and transparency in 
              all that we do. Thank you for choosing us as your trusted partner.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Grid container direction="column">
              <Link href="/aboutus" variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link href="/supportform" variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Contact Us
              </Link>
              <Link href="/terms" variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Privacy Policy
              </Link>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
