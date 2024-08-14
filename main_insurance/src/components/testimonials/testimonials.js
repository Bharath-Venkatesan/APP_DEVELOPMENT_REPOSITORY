import React from 'react';
import Slider from 'react-slick';
import './testimonials.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonialsData = [
  {
    name: 'VISHAL G V',
    plan: 'OPTIMA RESTORE',
    date: 'FEBRUARY 2024',
    location: 'PERUR',
    feedback: 'I am really impressed and happy with the 10/10 services I received from InsuranceApp customer support team. I am definitely going to continue this association with InsuranceApp and would also recommend my friends and relatives to get health insurance from you.',
    image: `${process.env.PUBLIC_URL}/images/Vishal.jpg`
  },
  {
    name: 'Shriraam',
    plan: 'OPTIMA RESTORE',
    date: 'FEBRUARY 2024',
    location: 'KUNIYAMUTHUR',
    feedback: 'InsuranceApp team has done a fabulous job in helping me find the right coverage at a competitive price, even during renewals I got immense help from the team to adjust my premiums for a wider cover. Thank You Mr. Bharath.',
    image: `${process.env.PUBLIC_URL}/images/Shriraam.jpg`
  },
  {
    name: 'Wilson Paul Raj',
    plan: 'PRIVATE CAR POLICY',
    date: 'MAY 2024',
    location: 'TIRUPUR',
    feedback: 'I have chosen InsuranceApp first time for my four-wheeler and I am glad to say that they provide really good services. The self inspection option is really good for saving valuable time of the customer. I thanks InsuranceApp team and Mr. Bharath for always providing good customer experience.',
    image: `${process.env.PUBLIC_URL}/images/Wilson.jpg`
  },
  {
    name: 'Gohul V K',
    plan: 'PRIVATE BIKE POLICY',
    date: 'SEPTEMBER 2023',
    location: 'NAMAKKAL',
    feedback: 'I have chosen this platform because one of my friends suggested me and I am happy with their service. Thanks to InsuranceApp & Team',
    image: `${process.env.PUBLIC_URL}/images/Gohul.jpg`
  }
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className='testi-container'>
      <h2 className='heading-title'>Hear From Our Happy Customers</h2>
      <Slider {...settings} className='testi-carousel'>
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className='testimonial'>
            <img src={testimonial.image} alt={testimonial.name} className='testimonial-img'/>
            <h3>{testimonial.name}</h3>
            <p className='plan'>{testimonial.plan}</p>
            <p className='date'>{testimonial.date}</p>
            <p className='location'>{testimonial.location}</p>
            <strong className='feedback'>{testimonial.feedback}</strong>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;
