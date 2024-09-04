import React, { useState, useEffect } from "react";
import { Box, Image, Progress } from "@chakra-ui/react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

const Mslider = () => {
  const imglink = [
    "https://static1.lenskart.com/media/desktop/img/harmony/29-jul-24/Harmony-top-banner-floatpop.gif",
    "https://static1.lenskart.com/media/desktop/img/harmony/29-jul-24/Harmony-top-banner-play.png",
    "https://static1.lenskart.com/media/desktop/img/harmony/29-jul-24/Harmony-top-banner-harrypotter.gif",
    "https://static1.lenskart.com/media/desktop/img/Aug24/VCIndoor/IndoorGlasses-HarmonyBanner.gif",
    "https://static1.lenskart.com/media/desktop/img/Aug24/21-aug-24/Homebanner-owndays.gif",
    "https://static1.lenskart.com/media/desktop/img/Aug24/22-aug-24/unbreakables/unbreakable-top-banner-.png",
    "https://static5.lenskart.com/media/uploads/Harmony-top-banner-ultemflex.gif",
    "https://static5.lenskart.com/media/uploads/new-banner.-border.gif",
    "https://static1.lenskart.com/media/desktop/img/harmony/29-jul-24/Harmony-top-banner-crystalacetate.png",
    "https://static1.lenskart.com/media/desktop/img/harmony/29-jul-24/Harmony-top-banner-floraledit.gif",
    "https://static1.lenskart.com/media/desktop/img/harmony/29-jul-24/Harmony-top-banner-vacationedit.gif",
    "https://static1.lenskart.com/media/desktop/img/harmony/29-jul-24/Harmony-top-banner-profit.png",
    "https://static5.lenskart.com/media/uploads/Harmony-top-banner-exchange-offer.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [autoSlide, setAutoSlide] = useState(true); // Controls auto-sliding
  const navigate = useNavigate()

  // Handle swipe direction
  const handleSwipe = (direction) => {
    if (isSwiping) return;

    setIsSwiping(true);
    setAutoSlide(false); // Stop auto-sliding on manual swipe

    if (direction === "LEFT" && currentIndex < imglink.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (direction === "RIGHT" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Auto-slide functionality
  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imglink.length);
      }, 2000); // Change slide every 1 second

      return () => clearInterval(interval); // Clean up interval on component unmount
    }
  }, [autoSlide]);

  // Reset swipe state after transition
  useEffect(() => {
    if (isSwiping) {
      const timer = setTimeout(() => {
        setIsSwiping(false);
        setAutoSlide(true); // Resume auto-sliding after a delay
      }, 500); // Delay before resuming auto-slide
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isSwiping]);

  return (
    <Box {...handlers} overflow="hidden" width="90%" position="relative" mx={4} display={{ base: "block", md: "none" }}>
      <Box
        display="flex"
        transition="transform 0.5s ease"
        transform={`translateX(-${currentIndex * 100}%)`}
        onClick={()=>navigate("/glasses")}
      >
        {imglink.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            width="100%"
          />
        ))}
      </Box>
      <Box position="relative" display='flex' justifyContent='center' my={5}>
        <Progress
          value={(currentIndex + 1) * (100 / imglink.length)}
          size="xs"
          position="absolute"
          bottom="0"
          width="20%"
          mx="auto"
          borderRadius="full"
          bg="gray.200"
          height="2px"
          transition="all 0.5s ease"
          sx={{
            "& > div": {
              backgroundColor: "black"
            },
          }}
          opacity={0.8}
        />
      </Box>
    </Box>
  );
};

export default Mslider;

