import React from "react";
import { Box, Skeleton, VStack, HStack, SkeletonText, SkeletonCircle } from "@chakra-ui/react";

const WishlistLoader = () => {
  return (
    <Box>
      

      {/* Skeleton loader for Wishlist header */}
      <HStack p={8} spacing={4}>
        <Skeleton height="30px" width="150px" />
        <Skeleton height="30px" width="80px" />
      </HStack>

      {/* Wishlist items loader */}
      <VStack mx={20} spacing={5}>
       
          <Box
            
            p={5}
            boxShadow="md"
            borderWidth="1px"
            borderRadius="lg"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="80%"
          >
            {/* Loader for the left side (image and details) */}
            <HStack spacing={4}>
              {/* Placeholder for product image */}
              <SkeletonCircle size="100px" />

              {/* Placeholder for product details */}
              <VStack align="start">
                <Skeleton height="20px" width="150px" />
                <Skeleton height="20px" width="100px" />
              </VStack>
            </HStack>

            {/* Loader for the action buttons */}
            <HStack spacing={3}>
              <Skeleton height="40px" width="100px" borderRadius="md" />
              <Skeleton height="40px" width="80px" borderRadius="md" />
            </HStack>
          </Box>
        
      </VStack>

      <VStack mx={20} spacing={5} my={5}>
       
          <Box
            
            p={5}
            boxShadow="md"
            borderWidth="1px"
            borderRadius="lg"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="80%"
          >
            {/* Loader for the left side (image and details) */}
            <HStack spacing={4}>
              {/* Placeholder for product image */}
              <SkeletonCircle size="100px" />

              {/* Placeholder for product details */}
              <VStack align="start">
                <Skeleton height="20px" width="150px" />
                <Skeleton height="20px" width="100px" />
              </VStack>
            </HStack>

            {/* Loader for the action buttons */}
            <HStack spacing={3}>
              <Skeleton height="40px" width="100px" borderRadius="md" />
              <Skeleton height="40px" width="80px" borderRadius="md" />
            </HStack>
          </Box>
        
      </VStack>

      <VStack mx={20} spacing={5} my={5}>
       
          <Box
            
            p={5}
            boxShadow="md"
            borderWidth="1px"
            borderRadius="lg"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="80%"
          >
            {/* Loader for the left side (image and details) */}
            <HStack spacing={4}>
              {/* Placeholder for product image */}
              <SkeletonCircle size="100px" />

              {/* Placeholder for product details */}
              <VStack align="start">
                <Skeleton height="20px" width="150px" />
                <Skeleton height="20px" width="100px" />
              </VStack>
            </HStack>

            {/* Loader for the action buttons */}
            <HStack spacing={3}>
              <Skeleton height="40px" width="100px" borderRadius="md" />
              <Skeleton height="40px" width="80px" borderRadius="md" />
            </HStack>
          </Box>
        
      </VStack>
    </Box>
  );
};

export default WishlistLoader;
