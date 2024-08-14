import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/welcome/welcome';
import LoginPage from './components/login/login';
import SignupPage from './components/signup/signup';
import LandingPage from './components/welcome/landingpage';
import SupportForm from './components/support/support';
import ClaimsPage from './components/claims/claims';
import MyPolicies from './components/mypolicies/mypolicies';
import PaymentPage from './components/payment/payment';
import HealthInsurance from './components/buy_insurances/health';
import CarInsurance from './components/buy_insurances/car';
import HomeInsurance from './components/buy_insurances/homeinsurance';
import BikeInsurance from './components/buy_insurances/bike';
import TravelInsurance from './components/buy_insurances/travel';
import PetInsurance from './components/buy_insurances/pet';
import AboutUs from './components/aboutus/aboutus';
import PrivacyPolicyAndTerms from './components/terms&conditions/terms';
import AdminDashboard from './components/admin/admin';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<WelcomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/supportform" element={<SupportForm/>} />
        <Route path="/claims" element={<ClaimsPage/>} />
        <Route path="/mypolicies" element={<MyPolicies/>} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/terms" element={<PrivacyPolicyAndTerms/>} />
        {/* Insurance routes */}
        <Route path="/health-insurance" element={<HealthInsurance/>} />
        <Route path="/car-insurance" element={<CarInsurance/>} />
        <Route path="/pet-insurance" element={<PetInsurance/>} />
        <Route path="/bike-insurance" element={<BikeInsurance/>} />
        <Route path="/travel-insurance" element={<TravelInsurance/>} />
        <Route path="/home-insurance" element={<HomeInsurance/>} />
      </Routes>
    </>
  );
}
export default App;
