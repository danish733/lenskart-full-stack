import React, { useState } from "react";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/fonts.css";

const trendGlass = [
  {
    url: "https://static1.lenskart.com/media/desktop/img/Sep21/image179.png",
    shape: "Round",
    button: "Explore",
  },
  {
    url: "https://static1.lenskart.com/media/desktop/img/Sep21/cateeye.jpg",
    shape: "Cat-Eye",
    button: "Explore",
  },
  {
    url: "https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg",
    shape: "Clubmaster",
    button: "Explore",
  },
  {
    url: "https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg",
    shape: "Transparent",
    button: "Explore",
  },
  {
    url: "https://static1.lenskart.com/media/desktop/img/Sep21/blend.jpg",
    shape: "Blend Edit",
    button: "Explore",
  },
  {
    url: "https://static1.lenskart.com/media/desktop/img/Sep21/clipon.jpg",
    shape: "Air Clip On",
    button: "Explore",
  },
  {
    url: "https://static1.lenskart.com/media/desktop/img/Sep21/airflex.jpg",
    shape: "Air Flex",
    button: "Explore",
  },
  {
    url: "https://static1.lenskart.com/media/desktop/img/Sep21/aviator.jpg",
    shape: "Retro Aviator",
    button: "Explore",
  },
];

const Trend = () => {
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate()

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 4) % trendGlass.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 4 + trendGlass.length) % trendGlass.length
    );
  };

  const displayedGlasses = trendGlass.slice(startIndex, startIndex + 4);

  return (
    <Box display={{base:"none", md:"flex"}} width='100%'>

        {/* wear the trend */}
      <Box flex={2} display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={0}> 
        <Text fontFamily='Rajdhani-Regular' fontSize={45}  >WEAR THE</Text>
        <Text fontFamily='serif' fontWeight={700} fontSize={45} mt={-5} ml={-18}>TREND</Text>
        <Text fontFamily='Futura-Std-Medium' fontSize={20} ml={-2}>Our Hottest Collection</Text>
      </Box>




{/* glass slider  */}
      <Box flex={7}>
        <Box position="relative">
          <Box display="flex" justifyContent="space-around">
            {displayedGlasses.map((glass, index) => (
              <Box key={index} textAlign="center" py={4} mx={4} mr={6}>
                <Box mb={2} p={4} borderRadius="md">
                  <Box mb={2}>
                    <Image src={glass.url} alt={glass.shape} />
                  </Box>
                  <Box fontFamily="Futura-Std-Medium" mt={3}>
                    {glass.shape}
                  </Box>
                </Box>
                <Button
                  fontFamily="Futura-Std-Medium"
                  fontWeight={400}
                  cursor="pointer"
                  px={8}
                  bgColor="teal.400"
                  color="white"
                  _hover={{ bgColor: "#56C3BF" }}
                  onClick={()=>{navigate("/product")}}
                >
                  {glass.button}
                </Button>
              </Box>
            ))}
          </Box>
          <Box
            position="absolute"
            left={-10}
            top="50%"
            transform="translateY(-50%)"
            onClick={handlePrev}
            fontSize={35}
            color="#D4D4D4"
            cursor="pointer"
          >
            <FaChevronLeft />
          </Box>
          <Box
            position="absolute"
            right={-10}
            top="50%"
            transform="translateY(-50%)"
            onClick={handleNext}
            fontSize={35}
            color="#D4D4D4"
            cursor="pointer"
          >
            <FaChevronRight />
          </Box>
        </Box>
      </Box>
      <Box flex={1}></Box>
    </Box>
  );
};

export default Trend;






{/* <Box>{setLoading ? <LoadingIndicator2 /> : <Box>
  {product.map((ele,i)=>(
     <Text> {ele.title} </Text>
  ))}
 </Box>}
 </Box>
<Box>Right Side</Box> */}