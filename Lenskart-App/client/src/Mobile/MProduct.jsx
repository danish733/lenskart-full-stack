import React, { useState, useEffect } from "react";
import {
  Box,
  GridItem,
  Flex,
  Image,
  Text,
  Divider,
  HStack,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import LoadingIndicator2 from "../components/LoadingIndicator2";

const MProduct = () => {
  const [product, setProduct] = useState([]);
  const [currentSlides, setCurrentSlides] = useState({}); // State to manage the current slide for each product
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const getProduct = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:7035/product/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(false);

    console.log(response.data.product);
    setProduct(response.data.product);

    // Initialize the current slide index for each product to 0
    const initialSlides = {};
    response.data.product.forEach((_, index) => {
      initialSlides[index] = 0;
    });
    setCurrentSlides(initialSlides);
  };

  useEffect(() => {
    getProduct();
  }, []);

  // Handle swipe functionality
  const handleSwipe = (direction, totalSlides, productIndex) => {
    setCurrentSlides((prev) => {
      const newIndex =
        direction === "left"
          ? (prev[productIndex] + 1) % totalSlides // Move to next slide
          : (prev[productIndex] - 1 + totalSlides) % totalSlides; // Move to previous slide
      return { ...prev, [productIndex]: newIndex };
    });
  };

  // Touch event handlers
  const handleTouchStart = (e, productIndex) => {
    const touchStartX = e.touches[0].clientX; // Record touch start position
    e.currentTarget.dataset.touchStartX = touchStartX;
  };

  const handleTouchEnd = (e, productIndex, totalSlides) => {
    const touchEndX = e.changedTouches[0].clientX; // Record touch end position
    const touchStartX = parseFloat(e.currentTarget.dataset.touchStartX);

    // Determine swipe direction
    if (touchStartX - touchEndX > 50) {
      handleSwipe("left", totalSlides, productIndex);
    } else if (touchEndX - touchStartX > 50) {
      handleSwipe("right", totalSlides, productIndex);
    }
  };

  const handleView = (id) => {
    navigate(`/glasses/${id}`);
  };

  return (
    <div>
      <Box>
        <Navbar />
      </Box>

      {loading ? (
        <LoadingIndicator2 />
      ) : (
        <Box mt="10vh" p={4}>
          {" "}
          <Box
            display="grid"
            gridTemplateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={4}
          >
            {product.map((ele, i) => (
              <GridItem
                key={i}
                width="90vw"
                ml={1}
                mt={4}
                onClick={() => handleView(ele._id)}
              >
                <Box p={4} boxShadow="md" borderRadius="md" overflow="hidden">
                  <Box
                    mb={3}
                    position="relative"
                    overflow="hidden"
                    onTouchStart={(e) => handleTouchStart(e, i)}
                    onTouchEnd={(e) =>
                      handleTouchEnd(e, i, ele.subImages.length)
                    }
                    data-touch-start-x="0"
                  >
                    {/* Slider Container */}
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      overflow="hidden"
                    >
                      {/* Slide Images */}
                      <Box width="100%" overflow="hidden">
                        <Flex
                          transition="transform 0.5s ease"
                          transform={`translateX(-${currentSlides[i] * 100}%)`}
                          whiteSpace="nowrap"
                        >
                          {ele.subImages.map((image, index) => (
                            <Box key={index} minWidth="100%">
                              <Image
                                src={image}
                                alt={`Product ${i} - ${index}`}
                                width="100%"
                                height="200px" // Set fixed height for the images
                                objectFit="cover" // Ensure the image covers the area
                                borderRadius="8px"
                              />
                            </Box>
                          ))}
                        </Flex>
                      </Box>
                    </Flex>

                    {/* Dots Indicators */}
                    {ele.subImages.length > 1 && (
                      <Flex
                        justifyContent="center"
                        mt={2}
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        p={2}
                        // Optional background for better visibility
                        borderRadius="md"
                      >
                        <Flex justifyContent="center" width="100%">
                          {ele.subImages.map((_, index) => (
                            <Box
                              key={index}
                              w={2} // Reduced dot width
                              h={2} // Reduced dot height
                              mx={1}
                              borderRadius="full"
                              bg={
                                currentSlides[i] === index
                                  ? "blue.500"
                                  : "gray.300"
                              }
                              transition="background-color 0.3s"
                            />
                          ))}
                        </Flex>
                      </Flex>
                    )}
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <HStack>
                        <Box fontSize={18} fontWeight="bold">
                          {" "}
                          Color :{" "}
                        </Box>
                        <Box fontWeight="bold" color="gray">
                          {ele.frameColor}
                        </Box>
                      </HStack>
                    </Box>
                    <Box fontSize={18} fontWeight="bold">
                      ₹{ele.price}
                    </Box>
                  </Box>
                  <Box fontWeight="bold" fontSize="lg">
                    {ele.title}
                  </Box>
                  <Box fontSize={14}>with FREE Premium Anti-Glare Lenses</Box>
                  <Divider mt={2} border="1px solid " borderColor="gray.200" />
                  <Box
                    display="flex"
                    justifyContent="right"
                    mt={2}
                    color="blue"
                  >
                    <HStack spacing={1}>
                      <Box fontSize={20}>
                        {" "}
                        <BiSolidOffer />{" "}
                      </Box>
                      <Box fontWeight={500}> Get Free Blu Screen Lenses</Box>
                    </HStack>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Box>{" "}
        </Box>
      )}
    </div>
  );
};

export default MProduct;
