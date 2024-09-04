import React from "react";
import { Spinner, Box } from "@chakra-ui/react";

const LoadingIndicator = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      position="fixed"
      top="0"
      left="0"
      bgColor="white"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

export default LoadingIndicator;
