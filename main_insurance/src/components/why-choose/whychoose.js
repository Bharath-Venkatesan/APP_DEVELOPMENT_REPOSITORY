import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const features = [
  {
    imgSrc: 'https://www.hdfcergo.com/assets/images/default-source/home-revamp/why-choose-us/Secured-1.5-crore-happy-customers.webp', 
    title: 'Secured 1.6+ Crore Happy Customers',
    description: 'Trust redefines relations at InsuranceApp. We consistently strive to make insurance easier, more affordable and more dependable.'
  },
  {
    imgSrc: 'https://www.hdfcergo.com/images/default-source/home-revamp/why-choose-us/at-your-service-247.svg', 
    description: 'In the time of distress, instant help is the need of the hour. Our in-house claims team is always there to provide a hassle-free claim experience.'
  },
  {
    imgSrc: 'https://www.hdfcergo.com/images/default-source/home-revamp/why-choose-us/trusted-brand1a44581620f943ebb91244b7bb9a3de4.svg', 
    title: '21 Years Of Serving India',
    description: 'Since last 21 years, we are committed towards serving India with technology driven insurance solutions with a human heart.'
  },
  {
    imgSrc: 'https://www.hdfcergo.com/assets/images/default-source/home-revamp/why-choose-us/Utmost-Transparency.webp', 
    title: 'Utmost Transparency',
    description: 'InsuranceApp General Insurance claims are settled with utmost transparency and ease.'
  },
  {
    imgSrc: 'https://www.hdfcergo.com/assets/images/default-source/home-revamp/why-choose-us/Utmost-Transparency.webp',
    title: 'Lauded And Awarded',
    description: 'InsuranceApp has been recognised as the "Best General Insurance Company of SKCET" at the 7th Annual Insurance Conclave & Awards, SKCET - 2024, organised by Insurance Alerts.'
  },
  {
    imgSrc: 'https://www.hdfcergo.com/assets/images/default-source/home-revamp/why-choose-us/Large-footprint.webp', 
    title: 'Cashless Network Garages',
    description: 'With our robust network of nearly 13000+ Cashless Healthcare providers and 10000+ Cashless Motor Garages, help is never too far.'
  },
];

export default function Features() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Why Choose Our InsuranceApp?
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ textAlign: 'center', padding: 2 }}>
              <img
                src={feature.imgSrc}
                alt={feature.title}
                style={{ height: 80, marginBottom: 16 }}
              />
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
