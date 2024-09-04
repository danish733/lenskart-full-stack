import React, { useState, useEffect } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

import CartLoader from "../components/CartLoader";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  useToast,
  Divider,
} from "@chakra-ui/react";
import Payment from "../components/Payment";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const toast = useToast();
  const token = localStorage.getItem("token");
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch cart items from the server
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://lenskart-full-stack.onrender.com/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = response.data.cartItems?.products || [];
      setCartItems(items);
      setCartCount(items.length);
      calculateTotalPrice(items); // Immediately calculate the total price after fetching
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  // Calculate total price of cart items
  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Update quantity of an item
  const updateQuantity = async (productId, quantity) => {
    setLoading(true);
    try {
      await axios.patch(
        `https://lenskart-full-stack.onrender.com/cart/update/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refetch cart items after update
      setLoading(false);
      fetchCartItems();
    } catch (error) {
      console.error("Error updating item quantity:", error);
      setLoading(false);
      toast({
        title: "Error updating item quantity",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Increase item quantity
  const increaseQuantity = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  // Decrease item quantity
  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `https://lenskart-full-stack.onrender.com/cart/delete/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: "Item removed from cart successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        colorScheme: "blue",
      });
      setLoading(false);
      // Ensure `fetchCartItems` is called to sync the cart state
      fetchCartItems();

      // Update cart count if the response includes cart items
      if (response.data.cartItems && response.data.cartItems.products) {
        setCartCount(response.data.cartItems.products.length);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error removing item from cart:", error);
      toast({
        title: "Error removing item from cart",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      calculateTotalPrice(cartItems);
    }
  }, [cartItems]);

  return (
    <Box>
      <Box display="flex" justifyContent={{sm:"space-between", md:"center"}}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="80%"
        >
          <Image src="https://static.lenskart.com/media/desktop/img/site-images/main_logo.svg"></Image>
          <HStack>
            <Image src="https://static.lenskart.com/media/desktop/img/DesignStudioIcons/Shield.svg"></Image>
            <Text fontSize={12}>100% Safe and secure</Text>
          </HStack>
        </Box>
      </Box>
      {token ? (
        <Box>
          {loading ? ( <CartLoader/> ) : ( <Box bgColor="#FBF9F7">
          <Box display="flex" justifyContent="center" >
            <Box
              display="flex"
              width="70%"
              justifyContent="center"
              pl={12}
              fontFamily="serif"
              mb={-8}
              mt={3}
            >
              <Box flex={3} fontSize={30}>
                Cart ({cartCount} items)
              </Box>
              <Box flex={2} pl={20} fontSize={30}>
                Bill Details
              </Box>
            </Box>
          </Box>
         


            <Box display="flex" mx={60} >
              <Box flex={4} p={10}>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <Box
                      key={item._id}
                      display="flex"
                      mb={6}
                      borderRadius={10}
                      bgColor="white"
                      
                    >
                      <Box flex={2}>
                        <Image
                          border="1px solid"
                          borderLeftColor="gray.200"
                          borderTopColor="gray.200"
                          borderBottomColor="gray.200"
                          borderRightColor="white"
                          borderLeftRadius={6}
                          src={item.product.image}
                        ></Image>{" "}
                      </Box>
                      <Box
                        flex={3}
                        borderRightRadius={6}
                        border="1px solid"
                        borderLeftColor="white"
                        borderTopColor="gray.200"
                        borderBottomColor="gray.200"
                        borderRightColor="gray.200"
                      >
                        <Box display="flex" pt={4}>
                          <Box px={4} flex={3} fontWeight={400} fontSize={14}>
                            {" "}
                            {item.product.description}{" "}
                          </Box>
                          <Box
                            px={4}
                            flex={1}
                            textAlign="end"
                            fontWeight="bold"
                          >
                            {" "}
                            &#x20B9;{item.product.price}{" "}
                          </Box>
                        </Box>
                        <Box px={4} py={3}>
                          {" "}
                          <Divider borderColor="gray" />
                        </Box>
                        <Box
                          px={4}
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Box fontWeight="bold">Quantity</Box>
                          <Box>
                            <HStack spacing={2} align="center">
                              <Button
                                size="sm"
                                onClick={() =>
                                  decreaseQuantity(
                                    item.product._id,
                                    item.quantity
                                  )
                                }
                              >
                                -
                              </Button>
                              <Text>{item.quantity}</Text>
                              <Button
                                size="sm"
                                onClick={() =>
                                  increaseQuantity(
                                    item.product._id,
                                    item.quantity
                                  )
                                }
                              >
                                +
                              </Button>
                            </HStack>
                          </Box>
                        </Box>
                        <Box px={4} py={3}>
                          {" "}
                          <Divider borderColor="gray" />
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          <HStack
                            mt={1}
                            px={6}
                            py={2}
                            borderRadius={6}
                            border="2px solid black"
                            cursor="pointer"
                            _hover={{
                              backgroundColor: "black",
                              color: "white",
                            }}
                          >
                            <Text fontWeight={500}>Remove From Cart</Text>
                            <Box fontSize={20}>
                              <MdOutlineRemoveShoppingCart />
                            </Box>
                          </HStack>
                        </Box>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Text>No item in the cart</Text>
                )}
              </Box>
              <Box flex={3}>
                <Box
                  bgColor="white"
                  p={4}
                  mt={10}
                  mx={14}
                  px={10}
                  borderRadius={6}
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Box>
                    <Box display="flex" justifyContent="space-between">
                      <Box color="gray">Total Item Price</Box>
                      <Box fontWeight={500} color="gray">
                        &#x20B9; {totalPrice.toFixed(2)}
                      </Box>
                    </Box>
                  </Box>
                  <Box py={3}>
                    {" "}
                    <Divider borderColor="black" />
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Box color="gray">Discount</Box>
                    <Box fontWeight={500} color="gray">
                      {" "}
                      - &#x20B9; {((totalPrice * 15) / 100).toFixed(2)}{" "}
                    </Box>
                  </Box>

                  <Box py={3}>
                    {" "}
                    <Divider borderColor="black" />
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Box fontWeight={500}>Amount Payable</Box>
                    <Box fontWeight={500}>
                      {" "}
                      &#x20B9;{" "}
                      {(totalPrice - (totalPrice * 15) / 100).toFixed(2)}
                    </Box>
                  </Box>
                </Box>
                {cartItems.length > 0 ? (
                  <Box> <Payment amount= {(totalPrice - (totalPrice * 15) / 100).toFixed(2)}  />    </Box>
                ) : (
                  <Box></Box>
                )}
              </Box>
            </Box>
          
        </Box> )}
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          Please Login to Checkout
        </Box>
      )}
    </Box>
  );
};

export default Cart;
