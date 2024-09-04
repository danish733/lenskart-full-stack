import React from "react";
import { Box, Skeleton, SkeletonText, SkeletonCircle, Divider, HStack, VStack } from "@chakra-ui/react";

const CartLoader = () => {
  return (
    <Box>
      
      {/* Cart Header */}
      <Box display="flex" justifyContent="center" mb={6}>
        <Box display="flex" width="70%" justifyContent="center" pl={12} fontFamily="serif" mb={-8} mt={3}>
          <Box flex={3}>   <Skeleton width="30%" height="30px" mr={20} />   </Box>
          <Box flex={2}>   <Skeleton width="30%" height="30px" ml={10}/>   </Box>
        </Box>
      </Box>

      {/* Cart Items Loader */}
      <Box display="flex" mx={60}>
        <Box flex={4} p={10}>
          {[...Array(3)].map((_, index) => (
            <Box
              key={index}
              display="flex"
              mb={6}
              borderRadius={10}
              bgColor="white"
              p={4}
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Box flex={2}>
                <Skeleton height="100px" width="100%" borderRadius="6px" />
              </Box>
              <Box
                flex={3}
                borderRightRadius={6}
                ml={4}
                p={4}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                border="1px solid"
                borderColor="gray.200"
              >
                <SkeletonText noOfLines={2} spacing="4" />
                <Divider my={3} />
                <HStack justifyContent="space-between">
                  <Skeleton height="20px" width="80px" />
                  <HStack spacing={2}>
                    <Skeleton height="30px" width="30px" borderRadius="md" />
                    <Skeleton height="20px" width="20px" />
                    <Skeleton height="30px" width="30px" borderRadius="md" />
                  </HStack>
                </HStack>
                <Divider my={3} />
                <Skeleton height="30px" width="150px" />
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bill Details Loader */}
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
            <VStack spacing={4}>
              <HStack justifyContent="space-between" width="100%">
                <Skeleton height="20px" width="120px" />
                <Skeleton height="20px" width="80px" />
              </HStack>
              <Divider />
              <HStack justifyContent="space-between" width="100%">
                <Skeleton height="20px" width="80px" />
                <Skeleton height="20px" width="50px" />
              </HStack>
              <Divider />
              <HStack justifyContent="space-between" width="100%">
                <Skeleton height="20px" width="120px" />
                <Skeleton height="20px" width="80px" />
              </HStack>
            </VStack>
          </Box>
          
          {/* Proceed to Checkout Loader */}
          <Box display="flex" justifyContent="center" my={8}>
            <Skeleton height="40px" width="200px" borderRadius="20px" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartLoader;