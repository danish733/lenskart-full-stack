import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Text,HStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Myorder = () => {
    const location = useLocation();
    const { orderId, amount } = location.state || {};
    const navigate = useNavigate()
  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
         <Box>
         <Text py={10} fontSize={30} fontWeight={500} textDecoration="underline">Your Order Details</Text>
    {orderId ? (
      <Box>
        <HStack> 
            <Text fontWeight={500}>Order ID :</Text>
            <Text> {orderId}</Text>
        </HStack>
        <HStack>
            <Text fontWeight={500}>Purchased Amount : </Text>
            <Text>₹{amount}</Text>
            </HStack>  
         <Button onClick={()=>{navigate("/")}} m={10}>Go to home page </Button>   
      </Box>
    ) : (
      <p>No order details available.</p>
    )}
         </Box>
  </Box>
  )
}

export default Myorder
