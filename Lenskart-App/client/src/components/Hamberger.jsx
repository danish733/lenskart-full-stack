import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCircleUser } from "react-icons/fa6";

const Hamberger = ({openSignIn}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()


  const token = localStorage.getItem('token')

  function handleLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    onClose()
    navigate("/")
  }

  return (
    <div>
      <Box fontSize={25} onClick={onOpen} cursor="pointer">
        <GiHamburgerMenu />
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="70%">
          <DrawerCloseButton />
          <DrawerHeader>
            <Image
              mt={-2}
              width="70%"
              src="https://static.lenskart.com/media/desktop/img/site-images/main_logo.svg"
            ></Image>
          </DrawerHeader>

          <DrawerBody p={0}>
            {/* Add your drawer content here */}
            <Box>
              <Box>
                <hr />
              </Box>
              <Box display="flex">
                <Box fontSize={30} px={3} py={6}>
                  <FaCircleUser />
                </Box>
                <Box mt={4}>
                  <Text fontWeight={700} fontSize={18}>
                    Hi Specsy!
                  </Text>
                  <Text fontSize={13} pr={10}>
                    Login or signup to track your orders and get access to
                    exclusive deals
                  </Text>
                </Box>
              </Box>
              {token ? <Box p={4}>
                <Button onClick={handleLogout} color='white' bg="#000042" width='100%' _hover={{color:"white", bgColor:"#000042"}}>Logout</Button>
              </Box> : <Box p={4}>
                <Button onClick={()=>{openSignIn(), onClose()}} color='white' bg="#000042" width='100%' _hover={{color:"white", bgColor:"#000042"}}>Login/Signup</Button>
              </Box> }
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Hamberger;
