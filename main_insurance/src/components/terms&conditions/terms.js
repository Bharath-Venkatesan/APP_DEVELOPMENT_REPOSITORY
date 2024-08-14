import React from 'react';
import { Container, Box, Typography, Divider, Paper } from '@mui/material';
import { styled } from '@mui/system';
import Footer from '../footer/footer';
import Header from '../header/header';
import Chatbot from '../chatbot/chatbot';

const redColor = '#d32f2f';
const darkGreyColor = '#333';
const lightGreyColor = '#f5f5f5';

const SectionContainer = styled(Paper)(({ theme }) => ({
  marginBottom: '50px',
  padding: '40px',
  backgroundColor: lightGreyColor,
  boxShadow: theme?.shadows?.[3] || '0px 3px 6px rgba(0,0,0,0.1)', // Fallback to a default boxShadow
  borderRadius: '8px',
}));

const SectionHeader = styled(Typography)({
  marginBottom: '20px',
  fontWeight: 700,
});

const ContentText = styled(Typography)({
  marginBottom: '16px',
  lineHeight: 1.7,
  color: darkGreyColor,
});

const DividerStyled = styled(Divider)({
  backgroundColor: redColor,
  marginY: '40px',
  height: '2px',
});

const PrivacyPolicyAndTerms = () => {
  return (
    <div>
      <Header />
      <Chatbot />
      <Container maxWidth="lg">
        <Box padding={3}>
          <SectionContainer>
            <SectionHeader variant="h4" align="center" color={redColor}>
              Privacy Policy
            </SectionHeader>
            <ContentText variant="body1">
              <strong>Effective Date:</strong> January 1, 2024
            </ContentText>
            <ContentText variant="body1">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </ContentText>
            <ContentText variant="body1">
              We collect information that you voluntarily provide to us when you register on the website, make a purchase, or contact us for support. This includes your name, email address, phone number, and payment details.
            </ContentText>
            <ContentText variant="body1">
              We use your information to fulfill your orders, manage your account, and improve our services. We may also use your information to send you promotional material or for marketing purposes. You can opt-out of receiving these communications at any time.
            </ContentText>
            <ContentText variant="body1">
              We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights. We implement security measures to protect your information from unauthorized access, use, or disclosure.
            </ContentText>
            <ContentText variant="body1">
              You have the right to access, update, or delete your personal information at any time. If you have any questions about this Privacy Policy, please contact us at support@insuranceapp.com.
            </ContentText>
          </SectionContainer>

          <DividerStyled />

          <SectionContainer>
            <SectionHeader variant="h4" align="center" color={redColor}>
              Terms and Conditions
            </SectionHeader>
            <ContentText variant="body1">
              <strong>Last Updated:</strong> January 1, 2024
            </ContentText>
            <ContentText variant="body1">
              These Terms and Conditions govern your use of our website and services. By accessing our website, you agree to comply with these terms. If you do not agree with any part of the terms, you must discontinue use of the site.
            </ContentText>
            <ContentText variant="body1">
              You must be at least 18 years of age to use our services. By using our site, you represent and warrant that you have the legal capacity to enter into these terms and comply with them.
            </ContentText>
            <ContentText variant="body1">
              All content provided on our website is for informational purposes only. We reserve the right to modify or discontinue our services at any time without notice. We are not liable for any damages arising from your use of the site.
            </ContentText>
            <ContentText variant="body1">
              You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </ContentText>
            <ContentText variant="body1">
              These terms are governed by and construed in accordance with the laws of states/territories of INDIA. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in INDIA.
            </ContentText>
            <ContentText variant="body1">
              If you have any questions about these Terms and Conditions, please contact us at support@insuranceapp.com.
            </ContentText>
          </SectionContainer>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyAndTerms;
