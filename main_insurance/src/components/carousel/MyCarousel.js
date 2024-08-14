import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MyCarousel = () => {
  const carouselContainerStyle = {
    width: '100%',
    height: '400px', // Adjust the height as needed
    overflow: 'hidden' // Ensure that the carousel doesn't overflow the container
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  return (
    <div style={carouselContainerStyle}>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showArrows={true}
        dynamicHeight={false}
        showStatus={false}
      >
        <div>
          <img src="https://cdn25.lemnisk.co/ssp/ApolloMunich/f2fe1d99-4abe-48ac-a9e2-04154706e6a9.png" alt="Slide 1" style={imgStyle} />
        </div>
        <div>
          <img src="https://www.hdfcergo.com/assets/images/default-source/homepage/red-rame-homepage-4x-cover.webp" alt="Slide 2" style={imgStyle} />
        </div>
      
      </Carousel>
    </div>
  );
};

export default MyCarousel;
