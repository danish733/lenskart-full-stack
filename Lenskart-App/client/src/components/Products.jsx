import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  GridItem,
  HStack,
  Text,
  Icon,
  VStack,
  Checkbox,
  Grid,
  Badge
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import axios from "axios";
import { RiStarFill } from "react-icons/ri";
import { GoHeart } from "react-icons/go";
import LoadingIndicator2 from "./LoadingIndicator2";
import { useToast } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const Products = () => {
  const toast = useToast()
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [rightSideLoading, setRightSideLoading] = useState(false);
  const [leftSideLoading, setLeftSideLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    frameType: [],
    frameShape: [],
    frameColor: [],
    frameSize: [],
    gender:[],
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate()

  const filterOptions = {
    frameType: [
      {
        image:
          "https://static.lenskart.com/images/cust_mailer/Eyeglass/FullRim.png",
        text: "Full Rim",
      },
      {
        image:
          "https://static.lenskart.com/images/cust_mailer/Eyeglass/HalfRim.png",
        text: "Half Rim",
      },
    ],
    frameShape: [
      {
        image:
          "https://static.lenskart.com/images/cust_mailer/Eyeglass/FullRim.png",
        text: "Wayfarer",
      },
      {
        image:
          "https://static.lenskart.com/images/cust_mailer/Eyeglass/HalfRim.png",
        text: "Round",
      },
      {
        image:
          "https://static.lenskart.com/images/cust_mailer/Eyeglass/HalfRim.png",
        text: "Rectangle",
      },
      {
        image:
          "https://static.lenskart.com/images/cust_mailer/Eyeglass/HalfRim.png",
        text: "Square",
      },
      {
        image:
          "https://static.lenskart.com/images/cust_mailer/Eyeglass/FullRim.png",
        text: "Cat Eye",
      },
      {
        image:
          "https://static.lenskart.com/images/cust_mailer/Eyeglass/HalfRim.png",
        text: "Aviator",
      },
      {
        image:
          "https://static.lenskart.com/images/cust_mailer/Eyeglass/HalfRim.png",
        text: "Geometric",
      },
      {
        image:
          "https://static.lenskart.com/images/cust_mailer/Eyeglass/HalfRim.png",
        text: "Hexagonal",
      },
    ],
    frameColor: [
      "Blue",
      "Red",
      "Black",
      "Green",
      "Transparent",
      "Gray",
      "Brown",
      "Pink",
      "Gold",
      "Silver",
      "Yellow",
      "White",
      "Purple",
      "Violet",
    ],
    frameSize: [
      "Medium",
      "Wide",
      "Narrow",
    ],
    gender: [
      "Male",
      "Female",
      "Kids",
      "Unisex"
    ],
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getProducts = async (filters = {}) => {
    setRightSideLoading(true);
    setLeftSideLoading(false);
    const token = localStorage.getItem("token");

    // Construct the filter query string
    const queryParams = new URLSearchParams();

    // Add filters to query parameters
    if (filters.frameType?.length) {
      queryParams.append("frameType", filters.frameType.join(","));
    }
    if (filters.frameShape?.length) {
      queryParams.append("frameShape", filters.frameShape.join(","));
    }
    if (filters.frameColor?.length) {
      queryParams.append("frameColor", filters.frameColor.join(","));
    }
    if (filters.frameSize?.length) {
      queryParams.append("frameSize", filters.frameSize.join(","));
    }
    if (filters.gender?.length) {
      queryParams.append("gender", filters.gender.join(","));
    }

    try {
      const response = await axios.get(
        `https://lenskart-full-stack.onrender.com/product?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productsData = response?.data?.product || [];
      setProducts(productsData);
      setFilteredProducts(productsData);
      console.log(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setRightSideLoading(false);
      setLeftSideLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleFilterChange = (type, value) => {
    const updatedFilters = { ...selectedFilters };
    if (updatedFilters[type].includes(value)) {
      updatedFilters[type] = updatedFilters[type].filter(
        (item) => item !== value
      );
    } else {
      updatedFilters[type].push(value);
    }
    setSelectedFilters(updatedFilters);
    getProducts(updatedFilters); // Fetch products with new filters
  };

  return (
    <Box>
      {/* Navbar Section */}
      <Box>
        <Navbar />
        <Navbar2 />
      </Box>

      {/* Products Page */}
      <Box display="flex" height="100vh" mt={10} width="100%">
        {/* Left Side */}
        <Box
          flex={1}
          borderRight="2px solid"
          borderColor="gray.100"
          overflowY="auto"
          height="100%"
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none", // IE and Edge
            "scrollbar-width": "none", // Firefox
          }}
        >
          <Box height="auto"  my={-20}>
            {leftSideLoading ? (
              <LoadingIndicator2 />
            ) : (
              <VStack align="start">
                <Box pt={40} px={10}>
                  <Text fontWeight={600} fontSize={15}>
                    FRAME TYPE
                  </Text>
                  <HStack mt={3}>
                    {filterOptions.frameType.map((type) => (
                      <HStack
                        cursor="pointer"
                        border={
                          selectedFilters.frameType.includes(type.text)
                            ? "2px solid #00BAC6"
                            : "1px solid gray"
                        }
                        onClick={() =>
                          handleFilterChange("frameType", type.text)
                        }
                      >
                        <Box
                          key={type.text}
                          display="flex"
                          flexDirection="column"
                          border="2px solid"
                          borderColor="gray.100"
                          alignItems="center"
                          fontSize={14}
                          _hover={{ border: "1px solid black" }}
                        >
                          <Image
                            src={type.image}
                            alt={type.text}
                            width="100%"
                            mr={2}
                          />
                          <Text color="gray">{type.text}</Text>
                        </Box>
                      </HStack>
                    ))}
                  </HStack>
                </Box>

                {/* Frame Shape Filter */}
                <Box my={4} px={10}>
                  <Text fontWeight={600} fontSize={15}>
                    FRAME SHAPE
                  </Text>
                  <Grid
                    display="grid"
                    templateColumns="repeat(3, 1fr)"
                    mt={3}
                    gap={2}
                  >
                    {filterOptions.frameShape.map((type) => (
                      <GridItem
                        cursor="pointer"
                        border={
                          selectedFilters.frameShape.includes(type.text)
                            ? "2px solid #00BAC6"
                            : "1px solid gray"
                        }
                        onClick={() =>
                          handleFilterChange("frameShape", type.text)
                        }
                      >
                        <Box
                          key={type.text}
                          display="flex"
                          flexDirection="column"
                          border="1px solid "
                           borderColor="gray.100"
                          alignItems="center"
                          fontSize={14}
                          _hover={{ border: "1px solid black" }}
                        >
                          <Image
                            src={type.image}
                            alt={type.text}
                            width="100%"
                            mr={2}
                          />
                          <Text color="gray">{type.text}</Text>
                        </Box>
                      </GridItem>
                    ))}
                  </Grid>
                </Box>

                {/* Color Filter */}
                <Text fontWeight={600} fontSize={15} pl={10}>
                  FRAME COLOR
                </Text>
                <Box height="200px" width="100%" overflowY="auto">
                  <VStack  align="start" pl={10}>
                    {" "}
                    {/* Align start to ensure left alignment */}
                    {filterOptions.frameColor.map((frameColor) => (
                      <Checkbox
                        color="gray"
                        borderColor="gray"
                        key={frameColor}
                        isChecked={selectedFilters.frameColor.includes(
                          frameColor
                        )}
                        onChange={() =>
                          handleFilterChange("frameColor", frameColor)
                        }
                      >
                        <Box fontSize={14}>{frameColor}</Box>
                      </Checkbox>
                    ))}
                  </VStack>
                </Box>
              {/* Frame size  */}
                <Box pl={10}>
                <Accordion allowToggle border="gray" p={0} m={0} >
      <AccordionItem>
        <h2>
          <AccordionButton
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="18vw" // Ensures full width when not expanded
            
            pl={-2}
          >
            <Box as='span' textAlign='left' >
            <Text fontWeight={600} fontSize={15}>
                  FRAME SIZE
                </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pl={-2} pb={4}>
          <VStack align="start">
          {filterOptions.frameSize.map((frameSize) => (
                      <Checkbox
                        color="gray"
                        borderColor="gray"
                        key={frameSize}
                        isChecked={selectedFilters.frameSize.includes(
                          frameSize
                        )}
                        onChange={() =>
                          handleFilterChange("frameSize", frameSize)
                        }
                      >
                        <Box fontSize={14}>{frameSize}</Box>
                      </Checkbox>
                    ))}
          </VStack>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton
          
          
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            
            pl={-2}
          >
            <Box as='span' textAlign='left'>
            <Text fontWeight={600} fontSize={15}>
                  GENDER
                </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <VStack align="start">
        {filterOptions.gender.map((gender) => (
                      <Checkbox
                        color="gray"
                        borderColor="gray"
                        key={gender}
                        isChecked={selectedFilters.gender.includes(
                          gender
                        )}
                        onChange={() =>
                          handleFilterChange("gender", gender)
                        }
                      >
                        <Box fontSize={14}>{gender}</Box>
                      </Checkbox>
                    ))}
          </VStack>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton
          
          
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            
            pl={-2}
          >
            <Box as='span' textAlign='left'>
            <Text fontWeight={600} fontSize={15}>
                  MATERIAL
                </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
           In Progress ...
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton
          
          
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            
            pl={-2}
          >
            <Box as='span' textAlign='left'>
            <Text fontWeight={600} fontSize={15}>
                  WEIGHT GROUP
                </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
           In Progress ...
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton
          
          
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            
            pl={-2}
          >
            <Box as='span' textAlign='left'>
            <Text fontWeight={600} fontSize={15}>
                  PRESCRIPTION TYPE
                </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
           In Progress ...
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton
          
          
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            
            pl={-2}
          >
            <Box as='span' textAlign='left'>
            <Text fontWeight={600} fontSize={15}>
                  COLLECTION
                </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
           In Progress ...
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton
          
          
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            
            pl={-2}
          >
            <Box as='span' textAlign='left'>
            <Text fontWeight={600} fontSize={15}>
                  SUB COLLECTION
                </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
           In Progress ...
        </AccordionPanel>
      </AccordionItem>

    </Accordion>

                </Box>
              </VStack>
            )}
          </Box>
        </Box>

        {/* Right Side */}
        <Box
          flex={4}
          overflowY="auto"
          height="100%"
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none", // IE and Edge
            "scrollbar-width": "none", // Firefox
          }}
        >
          {rightSideLoading ? (
            <LoadingIndicator2 />
          ) : (
            <Box pt={20} height="auto">
              <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap={6}
                m={8}
              >
                {filteredProducts.map((ele, i) => (
                  <GridItem key={i}>
                    <Box
                      p={3}
                      borderRadius={10}
                      boxShadow={`rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; `}
                      _hover={{
                        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
                        borderRadius: "10",
                      }}
                      cursor="pointer"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                     
                      
                    >
                      {/* wishlist  */}
                      <Box 
                        display="flex"
                        justifyContent="flex-end"
                        fontSize={30}
                      >
                        <Box  onClick={() => handleProductClick(ele._id)} >
                         <Badge >{ele.choice}</Badge>
                        </Box>
                      </Box>
                      {/* images  */}
                      <Box width="100%" height="180px"  onClick={() => handleProductClick(ele._id)} >
                        <Image
                          src={hoveredIndex === i ? ele.subImages[1] : ele.subImages[0]}
                          style={{
                            objectFit: "cover",
                            objectPosition: "0 -30",
                            width: "100%",
                            height: "100%",
                          }}
                        ></Image>
                      </Box>
                      {/* rating  */}
                      <Box
                        bgColor="#F5F5FF"
                        width="30%"
                        py={2}
                        display="flex"
                        justifyContent="center"
                        borderRadius={30}
                        onClick={() => handleProductClick(ele._id)}
                      >
                        <HStack spacing={1} fontSize={14}  onClick={() => handleProductClick(ele._id)}>
                          <Text fontWeight={600}>4.5</Text>
                          <Icon color="#00BAC6" fontSize={22}>
                            <RiStarFill />
                          </Icon>
                          <Text>215</Text>
                        </HStack>
                      </Box>

                      {/* Title  */}
                      <Box mt={3} fontWeight={600}  onClick={() => handleProductClick(ele._id)}>
                        <Text>{ele.title}</Text>
                      </Box>

                      {/* size & power  */}
                      <Box fontSize={14}  onClick={() => handleProductClick(ele._id)}>
                        <Text>
                          Size: {ele.frameSize} &middot; {ele.framePower}
                        </Text>
                      </Box>

                      {/* price  */}
                      <Box fontWeight={700}  onClick={() => handleProductClick(ele._id)}>
                        <Text>&#8377;{ele.price}</Text>
                      </Box>
                      <Box
                        m={-3}
                        mt={3}
                        width="107%"
                        height="40px"
                        bgColor="red"
                        display="flex"
                        alignItems="center"
                        bgGradient="linear(to-r, #F7F1DE, #FDFCF7)"
                        borderBottomRadius={10}
                        borderBottomRightRadius={10}
                        onClick={() => handleProductClick(ele._id)}
                      >
                        <Text
                          color="#B89D57"
                          fontWeight="500"
                          fontSize={14}
                          ml={4}
                        >
                          Get it for &#8377;700. Coupon: TRYUS
                        </Text>
                      </Box>
                    </Box>
                  </GridItem>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
