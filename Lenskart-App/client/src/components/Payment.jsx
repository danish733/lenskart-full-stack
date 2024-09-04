import React, { useState } from 'react';
import { Box, HStack, Text, Spinner } from '@chakra-ui/react';
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Payment = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const [storedAmount, setStoredAmount] = useState(amount);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true); // Set loading to true when payment starts
    try {
      const res = await fetch(`http://localhost:7035/payment/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: storedAmount })
      });

      const data = await res.json();
      handlePaymentVerify(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false); // Set loading to false after payment completes
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: "rzp_test_67kTCuS7gPn5ie", // Replace with your actual Razorpay Key ID
      amount: data.amount, // Ensure amount is in paise, not INR
      currency: data.currency,
      name: "Danish",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch(`http://localhost:7035/payment/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: storedAmount,
            })
          });

          const verifyData = await res.json();
          console.log("verify data is", verifyData)

        //   if (verifyData.message) {
        //     toast.success(verifyData.message);
        //   }
          if (verifyData.message === "Payment Successfully") {
            toast.success(verifyData.message);
            navigate('/myorder', { state: { orderId: verifyData.orderId, amount: storedAmount } });
          }
        } catch (error) {
          console.log(error);
        }
      },
      prefill: {
        name: "Your Name",
        email: "your.email@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Your Address",
      },
      theme: {
        color: "#5f63b8"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <Box display="flex" justifyContent="center" my={8} onClick={handlePayment}>
      {loading ? ( // Show spinner if loading is true
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='lg'
        />
      ) : ( // Show button if loading is false
        <HStack
          bgColor="#11DAAC"
          fontWeight={500}
          fontSize={18}
          spacing={1}
          px={14}
          py={3}
          borderRadius={30}
          cursor="pointer"
        >
          <Text> Proceed to checkout </Text>
          <Box fontSize={20}>
            <IoIosArrowForward />
          </Box>
        </HStack>
      )}
      <Toaster />
    </Box>
  );
}

export default Payment;

