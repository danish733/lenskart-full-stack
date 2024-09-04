import React from "react";
import { Spinner, Box } from "@chakra-ui/react";

const LoadingIndicator2 = () => {
  return (
    <Box
    display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%"
    >
      <Spinner
        thickness="4px"
        speed="1s"
        emptyColor="gray.200"
        color="#00BAC6"
        size="xl"
      />
    </Box>
  );
};

export default LoadingIndicator2;