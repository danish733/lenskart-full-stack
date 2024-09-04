import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Image, Text, Button, VStack, HStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useToast } from "@chakra-ui/react";
import WishlistLoader from "../components/WishlistLoader";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0); // State for wishlist count
  const toast = useToast()
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false)

  const getWishlist = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:7035/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(response.data.wishlist.products);
      setWishlistCount(response.data.wishlist.products.length); // Update count
      setLoading(false)
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setLoading(false)
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  // Move to Cart function
  const moveToCart = async (productId) => {
    setLoading(true)
    try {
      await axios.post(
        "http://localhost:7035/cart/add",
        { productId, quantity: 1 }, // Assuming default quantity 1
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Remove the item from the wishlist state
      deleteFromWishlist(productId);
      setLoading(false)
      toast({
        title: "Item moved to cart successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        colorScheme:"blue"
      });
    } catch (error) {
      console.error("Error moving item to cart:", error);
      setLoading(false)
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Delete from Wishlist function
  const deleteFromWishlist = async (productId) => {
    setLoading(true)
    try {
      await axios.delete(`http://localhost:7035/wishlist/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const updatedWishlist = wishlist.filter((item) => item._id !== productId);
      setWishlist(updatedWishlist);
      setWishlistCount(updatedWishlist.length); // Update count after deletion
      setLoading(false)
      toast({
        title:"Item deleted from wishlist",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        colorScheme:"blue"
      });
    } catch (error) {
      console.error("Error deleting item from wishlist:", error);
      setLoading(false)
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  
  return (
    <Box>
      <Box mb={50}>
        {" "}
        <Navbar />{" "}
      </Box>
      {token ? (
        <Box>
          {wishlist.length > 0 ? ( <HStack p={8}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              fontSize={20}
              fontWeight={500}
             
            >
              My Wishlist
            </Box>
            <Box fontSize={20}>{wishlistCount} items </Box>
          </HStack>
 ) : ( <Box></Box> )}
          {loading ? ( <WishlistLoader/> ) : ( <Box>
            <Box>
              <VStack mx={20} spacing={5}>
                {wishlist.length > 0 ? (
                  wishlist.map((product) => (
                    <Box
                      key={product._id}
                      p={5}
                      boxShadow="md"
                      borderWidth="1px"
                      borderRadius="lg"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="80%"
                    >
                      <HStack spacing={4}>
                        <Image
                          src={product.image}
                          alt={product.title}
                          boxSize="100px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <VStack align="start">
                          <Text fontWeight="bold">{product.title}</Text>
                          <Text color="blue.600">Price: ₹{product.price}</Text>
                        </VStack>
                      </HStack>
                      <HStack spacing={3}>
                        <Button
                          colorScheme="teal"
                          onClick={() => moveToCart(product._id)}
                        >
                          Move to Cart
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => deleteFromWishlist(product._id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Box>
                  ))
                ) : (
                  <Text
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="90vh"
                  >
                    No items in the wishlist.
                  </Text>
                )}
              </VStack>
            </Box>
          </Box> )}
        </Box>
      ) : (
        <Box  display="flex" justifyContent="center" alignItems="center" height="70vh">Please Login to See Your Wishlist</Box>
      )}
    </Box>
  );
};

export default Wishlist;
