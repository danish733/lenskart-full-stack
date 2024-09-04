import React, { useState } from "react";
import { Box, Image, Text , Divider} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Glasses = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate()

  const glassList = [
    {
      url: "https://static1.lenskart.com/media/desktop/img/Apr22/a2.png",
      name: "Eyeglasses",
      categories: [
        { title1: "Air light-weight", title2: "Powered Lenses", title3: "Starting", price: 2000 },
        { title1: "Premium Eye Glasses", title2: "Jhon Jacob,Fossils", title3: "Starting", price: 3500 },
        { title1: "Kids Glasses", title2: "Powered Lenses", title3: "Starting", price: 800 },
      ],
    },
    {
        url: "https://static1.lenskart.com/media/desktop/img/Apr22/b2.png",
        name: "Sunglasses",
        categories: [
          { title1: "vincent change ", title2: "With Gold Membership", title3: "Starting", price: 1000 },
          { title1: "Premium Sun Glasses", title2: "UV 400", title3: "Starting", price: 3000 },
        ],
      },
      {
        url: "https://static1.lenskart.com/media/desktop/img/Apr22/d2.png",
        name: "Screen Glasses",
        categories: [
          { title1: "Screen Glasses", title2: "Blue zero power", title3: "Starting", price: 500 },
          { title1: "Kids Range", title2: "Blue zero power", title3: "Starting", price: 700 },
        ],
      },
      {
        url: "https://static1.lenskart.com/media/desktop/img/Apr22/d.png",
        name: "Contact Lenses",
        categories: [
          { title1: "Clear With Power", title2: "", title3: "Starting", price: 99 },
          { title1: "Colour With Power", title2: "", title3: "Starting", price: 199 },
          { title1: "Colour Without Power", title2: "", title3: "Starting", price: 130 },
          { title1: "Lens Solution", title2: "", title3: "Starting", price: 123 },
        ],
      },
      {
        url: "https://static1.lenskart.com/media/desktop/img/Apr22/e2.png",
        name: "Power Sunglasses",
        categories: [
          { title1: "Power Sunglasses", title2: "with Lenses", title3: "Starting", price: 2700 },
        ],
      },
      {
        url: "https://static1.lenskart.com/media/desktop/img/June22/prog11.jpg",
        name: "Progressive Lenses",
        categories: [
          { title1: "Progressives", title2: "Not Expensive", title3: "Starting", price: 2000 },
        ],
      }
  ];

  return (
    <Box bg="#FBF9F7" pt="120px" width='100%'  >
      <Box 
    display={{ base: "none", sm: "flex" }} 
    flexDirection={{ base: "column", sm: "row" }}
    justifyContent="space-around" 
    gap={10} 
    p={6}
  >
        {glassList.map((list, i) => (
          <Box
            key={i}
            bg="white"
            px={2}
            pt={2}
            borderRadius={6}
            cursor={"pointer"}
            position="relative"
            onMouseEnter={() => setHoveredItem(i)}
            onMouseLeave={() => setHoveredItem(null)}
            _hover={{borderRadius:"0px", boxShadow: "0 8px 10px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)"}}
            onClick={()=>{navigate("/product")}}
          >
            <Image bg="#FBF9F7" src={list.url} />
            <Text py={2} display="flex" alignItems="center" justifyContent="center">
              {list.name}
            </Text>

            {hoveredItem === i && (
              <Box
                position="absolute"
                top="93%"
                left="0"
                mt={2}
                bg="white"
                borderRadius="0px 0px 6px 6px"
                zIndex={20}
                bgColor='white'
                width="100%"
                boxShadow="0 8px 10px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)"
                cursor='pointer'
                
              >
                {list.categories.map((category, index) => (
                  <Box key={index} _hover={{ bgColor: "#F4F4F4" }} >
                    <Divider borderColor="gray.300" />
                    <Box p={3} fontFamily={'sans-serif'} fontSize={13} >
                    <Box  display='flex' justifyContent='space-between'>
                        <Text fontWeight={600} >{category.title1}</Text>
                        <Text >{category.title3}</Text>
                    </Box>
                    <Box display='flex' justifyContent='space-between'>
                        <Text >{category.title2}</Text>
                        <Text fontWeight={600} mx={2}>₹{category.price}</Text>
                    </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Glasses;

