import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar2 = () => {
  const Navlist = [
    "EYE GLASSES",
    "SCREEN GLASSES",
    "KIDS GLASSES",
    "CONTACT LENSES",
    "SUN GLASSES",
    "HOME EYE-TEST",
    "STORE LOCATOR",
  ];
  const navigate = useNavigate()
  
  return (
    <Box 
   
      position="fixed" 
      top="60px"
      width="100%" 
      bg="#FBF9F7" 
      zIndex={999} 
      display={{ base: "none", md: "flex" }} 
      gap={6} 
      alignContent="center" 
      pl={10}
        overflow="hidden"
    >
      {Navlist.map((list, i) => (
        <Text
          key={i}
          color="#000042"
          fontWeight={500}
          pt={4}
          pb={4}
          cursor="pointer"
          _hover={{
            borderBottom: "3px solid #000042",
          }}
          onClick={()=>{navigate("/product")}}
        >
          {list}
        </Text>
      ))}
    </Box>
  );
};

export default Navbar2;
