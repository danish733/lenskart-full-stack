import React from "react";
import { Stack, Skeleton, Box, Flex, SkeletonText, SkeletonCircle } from "@chakra-ui/react";

const LoadingIndicator3 = () => {
  return (
    <Box p={4} mt={4} pr={8}>
      {/* Main container for skeleton loader */}
      <Stack spacing={6}>
        {/* Skeleton for product title and wishlist icon */}
        <Flex justifyContent="space-between" alignItems="center">
          <Skeleton height="20px" width="60%" />
          <SkeletonCircle size="6" />
        </Flex>

        {/* Skeleton for product description */}
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />

        {/* Skeleton for product size */}
        <Skeleton height="20px" width="40%" />

        {/* Skeleton for product price and GST text */}
        <Flex alignItems="center" gap={2}>
          <Skeleton height="25px" width="20%" />
          <Skeleton height="12px" width="30%" />
        </Flex>

        {/* Skeleton for product color */}
        <Skeleton height="20px" width="30%" />

        {/* Skeleton for special offer box */}
        <Box bgColor="#F7F1DE" p={4} borderRadius="md">
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
        </Box>

        {/* Skeleton for the 'BUY NOW' button */}
        <Skeleton height="50px" width="100%" borderRadius="md" />

        {/* Skeleton for the 'Try NOW' button */}
        <Skeleton height="50px" width="100%" borderRadius="md" />
      </Stack>
    </Box>
  );
};

export default LoadingIndicator3;

