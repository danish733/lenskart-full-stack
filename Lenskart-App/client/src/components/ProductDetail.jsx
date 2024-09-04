import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, HStack, Text, Image, Grid, GridItem , Button} from "@chakra-ui/react";
import LoadingIndicator2 from "./LoadingIndicator2";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import LoadingIndicator3 from "./LoadingIndicator3";
import { GoHeart } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import Footer from "./Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const toast = useToast();

  const token = localStorage.getItem("token")

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://lenskart-full-stack.onrender.com/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(response.data.product);
      console.log(response.data.product);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const handleWishlist = async () => {
    const payload = {
      productId: product._id, // Ensure product._id exists and is correctly assigned
    };
  
    if (token) {
      try {
        const response = await axios.post(
          `https://lenskart-full-stack.onrender.com/wishlist/add`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        toast({
          title: "Added to wishlist",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
          colorScheme: "blue",
        });
        navigate("/wishlist")
      } catch (error) {
        toast({
          title: error.response?.data?.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } else {
      toast({
        title: "Please login",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        colorScheme:"blue"
      });
    }
  };

  const handleCart = async(productId)=>{
    const payload = {
        productId: product._id, // Ensure product._id exists and is correctly assigned
      };
      if (token) {
        try {
          const response = await axios.post(
            `https://lenskart-full-stack.onrender.com/cart/add`,
            payload,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
    
          toast({
            title: "Added to cart",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
            colorScheme:"blue"
          });
          navigate("/cart")
        } catch (error) {
          toast({
            title: error.response?.data?.message || "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
            colorScheme: "red"
          });
        }
      } else {
        toast({
          title: "Please login",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          colorScheme:"blue"
        });
      }
  }

  return (
    <Box >
      <Box >
        <Box mb={30}>
          <Navbar />
          <Navbar2 />
        </Box>
        <Box display="flex" pt={20}>
          {/* left Side  */}
          <Box flex={6}  >
            {loading ? (
              <LoadingIndicator2 />
            ) : (
              <Box>
                {product ? (
                  <Grid templateColumns="repeat(2,1fr)" gap={4} p={8} >
                    {product.subImages.map((image, index) => (
                      <Box overflow="hidden" borderRadius={10} border="2px solid" borderColor="gray.100">
                        <GridItem  key={index}  _hover={{ transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out' }}>
                       <Box >  <Image borderRadius={10} objectFit="contain" cursor="pointer" width="100%" src={image} alt={`Sub Image ${index + 1}`} /> </Box>
                      </GridItem>
                      </Box>
                    ))}
                  </Grid>
                ) : (
                  <Box>Please Refresh Again</Box>
                )}
              </Box>
            )}
          </Box>

          {/* right side  */}
          <Box flex={3} >
          <Box p={4}mt={4} pr={8} >
                {loading ? ( <LoadingIndicator3/> ) : ( <Box>
                   <Text>
                    {product ? <Box> 
                        <Box >
                            <Box display="flex" justifyContent="space-between">
                                <Box fontWeight={500} color="gray"> {product.title} </Box>
                                <Box
                        display="flex"
                        justifyContent="flex-end"
                        fontSize={30}
                      >
                        <Box _hover={{cursor:"pointer", color: "red" }} onClick={handleWishlist}>
                          <GoHeart />
                        </Box>
                      </Box>
                            </Box>
                            <Box my={3} fontWeight={700} color="black">
                                {product.description}
                            </Box>
                            <Box fontWeight={700} color="gray">
                                Size : {product.frameSize}
                            </Box>
                            <Box mt={2}>
                                <HStack>
                                    <Box fontSize={25} fontWeight={500} color="#00BAC6" >&#8377;{product.price}</Box>
                                    <Box fontSize={12} color="gray" mt={3}> ( &#8377;{product.price} with GST ) </Box>
                                </HStack>
                            </Box>
                            <Box mt={4} fontWeight={700} color="gray">
                                Color : {product.frameColor}
                            </Box>
                            <Box bgColor="#F7F1DE" width="100%" height="70px" p={4} my={6} borderRadius={2}>
                                <Text mt={-1} fontSize={14}>with pre-fitted BLU Screen Glasses</Text>
                                <Text fontWeight={500}>Get it for ₹700. Coupon: TRYUS</Text>
                            </Box>
                            <Box>
                                <Button onClick={handleCart} width="100%" py={7} color="white" bgColor='#00BAC6' _hover={{backgroundColor:"#00BAC6"}}>BUY NOW</Button>
                            </Box>
                            <Box>
                                <Button onClick={handleWishlist} width="100%" py={7} mt={7} color="black" border="1px solid gray" bgColor='white' _hover={{backgroundColor:"white"}}>ADD TO WISHLIST</Button>
                            </Box>
                            <Box my={4}>
                                <Image src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/lkblu9.jpg"></Image>
                            </Box>
                            <Box my={6}>
                                <Image src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/lkblu10.jpg"></Image>
                            </Box>
                            <Box my={6} >
                                <Image src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/lkblu1.jpg"></Image>
                            </Box>
                            <Box my={4} >
                                <Image src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/lkblu2.jpg"></Image>
                            </Box>
                            <Box my={4} >
                                <Image src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/lkblu3.jpg"></Image>
                            </Box>
                            <Box my={4} >
                                <Image src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/lkblu5.jpg"></Image>
                            </Box>
                            <Box my={4} >
                                <Image src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/lkblu6.jpg"></Image>
                            </Box>
                            <Box my={4} >
                                <Image src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/lkblu7.jpg"></Image>
                            </Box>
                            <Box my={4} >
                                <Image src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/lkblu8.jpg"></Image>
                            </Box>
                        </Box>
                    </Box> : <Box>Please Refresh Again</Box> }
                   </Text>
                </Box> )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Footer/>
      </Box>
    </Box>
  );
};

export default ProductDetail;
