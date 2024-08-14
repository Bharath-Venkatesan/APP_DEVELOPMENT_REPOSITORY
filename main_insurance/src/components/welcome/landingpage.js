import React from 'react';
import './landingpage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLoginclick = () => {
    navigate('/login');
  };

  // const handleAdminLoginClick = () => {
  //   navigate('/admin/login'); // Assuming you have a route for admin login
  // };

  return (
    <div className="landing-container">
      <div className="main-content">
        <div className="text-content">
          <h1 style={{ color: '#69d6d1', fontWeight: 'bolder' }}>
            <div className='insuranceheading' style={{ fontSize: '100px' }}>InsuranceApp</div>
          </h1>
          <h1 className='tagline'>Protect What Matters Most to You</h1>
          <div className="button-group">
            <button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button>
            <button className="login-btn" onClick={handleLoginclick}>Sign In</button>
            {/* <button className="admin-login-btn" onClick={handleAdminLoginClick}>Admin Login</button> */}
          </div>
        </div>
        <div className="image-content">
          <img src="https://img.freepik.com/premium-photo/3d-business-insurance-concept-policy-guarantee-business-3d-render-illustration-with-check-marks-umbrella-shield-checklist_1240525-8935.jpg?size=626&ext=jpg&ga=GA1.1.1780410485.1722773524&semt=ais_hybrid" alt="Insurance Illustration" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
