import React from 'react';
import MyCarousel from '../carousel/MyCarousel';
import FloatingText from '../carousel/floatingtext';
import FloatingActionButtonZoom from '../buttongroup/button';
import './welcome.css'; 
import Testimonials from '../testimonials/testimonials';
import Features from '../why-choose/whychoose';
import Footer from '../footer/footer';
import MapComponent from '../map/Map';
import Header from '../header/header';
import Chatbot from '../chatbot/chatbot';

const WelcomePage = () => {
  return (
    <div className="page-container">
      <Header/>
      <Chatbot/>
      <FloatingText />
      <MyCarousel />
      <div className='buttoninsurancemenu'>
        <FloatingActionButtonZoom/>
      </div>     
      <Testimonials/>
      <Features/>
      <MapComponent/>
      <Footer/>
    </div>
  );
};

export default WelcomePage;
