import React, { useState, useEffect, useRef } from 'react';
import { Box, Image, IconButton } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Slider = () => {
  const imgLink = [
    "https://static1.lenskart.com/media/desktop/img/republic/hustlr-ace/Hustlr_Ace_Desktop_Banner.gif",
    "https://static5.lenskart.com/media/uploads/Desktopnew_1505.jpg",
    "https://static1.lenskart.com/media/desktop/img/Aug24/21-aug-24/desktop-owndays.jpg",
    "https://static5.lenskart.com/media/uploads/WEBlkair_matte_essential.gif",
    "https://static1.lenskart.com/media/desktop/img/Aug24/22-aug-24/Other%20assets/New%20Web%20Banner.png",
    "https://static1.lenskart.com/media/desktop/img/June24/Crystal_acetate/web-option-1CAcetate.gif",
    "https://static1.lenskart.com/media/desktop/img/Aug24/22-aug-24/blu/Web%20Banner%201920x520.jpg",
    "https://static5.lenskart.com/media/uploads/Web_Banner_1920x520-new.jpg",
    'https://static5.lenskart.com/media/uploads/webharry_potter.gif',
    'https://static5.lenskart.com/media/uploads/webFloat_POP2124.jpg',
    "https://static1.lenskart.com/media/desktop/img/Aug24/6-aug-24/cs/Desktop-2.gif",
    'https://static5.lenskart.com/media/uploads/Desktop-Urban.jpg',
    "https://static1.lenskart.com/media/desktop/img/May24/pro-fit-lenskart-air/Desktop-Bannerpro_fit040624.gif",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionDuration = 500; // Duration in milliseconds
  const slideIntervalRef = useRef();
  const navigate = useNavigate()

  const goToPreviousSlide = () => {
    setIsTransitioning(true);
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(imgLink.length - 1);
      }, transitionDuration);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const goToNextSlide = () => {
    setIsTransitioning(true);
    if (currentIndex === imgLink.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, transitionDuration);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    slideIntervalRef.current = setInterval(() => {
      goToNextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(slideIntervalRef.current); // Cleanup on unmount
  }, [currentIndex]);

  return (
    <Box position="relative" width="100%" margin="0 auto" overflow="hidden" my={4} cursor='pointer' display={{base:"none",md:"block"}}  >
      <Box
        display="flex"
        transition={isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none'}
        transform={`translateX(-${currentIndex * 100}%)`}
        onClick={()=>{navigate("/product")}}
      >
        {imgLink.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            width="100%"
            flexShrink="0"
            height="auto"
          />
        ))}
      </Box>

      <IconButton
        aria-label="Previous Slide"
        icon={<FaChevronLeft />}
        position="absolute"
        left="6%"
        top="50%"
        transform="translateY(-50%)"
        onClick={goToPreviousSlide}
        zIndex={10}
        background="none"
        color="white"
        fontSize={40}
      />

      <IconButton
        aria-label="Next Slide"
        icon={<FaChevronRight />}
        position="absolute"
        right="6%"
        top="50%"
        transform="translateY(-50%)"
        onClick={goToNextSlide}
        zIndex={10}
        background="none"
        color="white"
        fontSize={40}
      />
    </Box>
  );
};

export default Slider;

