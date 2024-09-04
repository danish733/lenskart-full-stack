import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiAdminLine } from "react-icons/ri";
import { Link, Box, HStack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, IconButton, Collapse, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchField from "./SearchField";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Hamberger from "./Hamberger";
import Location from "./Location";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const openSignIn = () => setSignInOpen(true);
  const closeSignIn = () => setSignInOpen(false);

  const openSignUp = () => setSignUpOpen(true);
  const closeSignUp = () => setSignUpOpen(false);

  const navigate = useNavigate()

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Implement your search logic here
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    setDropdownOpen(false);
    navigate("/")
    // Optionally, redirect the user after logout
    // navigate('/login');
  };

  const token = localStorage.getItem('token');
  const firstName = localStorage.getItem('firstName');

  const adminLog = ()=>{
    const admintoken = localStorage.getItem("admintoken")
    if(!admintoken){
     return navigate("/admin/login")
    }
  }

  return (
    <>
      <Box position="fixed" top={0} width="100%" zIndex={1000} bg="gray.100" >
        <Box display="flex" justifyContent="space-around" alignItems="center" pr={4} gap={10}>
          {/* Location */}
          <Box display={{ sm: "block", md: "none" }}>
            <Location />
          </Box>

          {/* Lenskart image */}
          <Box onClick={() => navigate("/")} _hover={{ cursor: "pointer" }} display={{ base: "none", md: "block" }}>
            <Image src="https://static.lenskart.com/media/desktop/img/site-images/main_logo.svg" alt="Logo" />
          </Box>

          {/* Lenskart phone number */}
          <Box display={{ base: "none", md: "block" }}>
            <Image width={40} src="https://static1.lenskart.com/media/desktop/img/republic/eye/new-toll-number.png" />
          </Box>

          {/* Lenskart search field */}
          <Box flex="1" maxWidth="500px" display={{ base: "none", md: "block" }}>
            <SearchField onSearch={handleSearch} />
          </Box>

          {/* SignIn & SignUp / User Info */}
          <Box display="flex" justifyContent="space-around" gap={8} >
            {token ? (
              <Box display={{base:"none", md:"flex"}} alignItems="center" position="relative">
                <HStack spacing={-8}>
                  <Text fontWeight={600}>Welcome, {firstName}</Text>
                  <IconButton
                  
                  fontSize={25}
                  
                    icon={<ChevronDownIcon />}
                    color="black"
                    aria-label="Open dropdown"
                    onClick={() => {
                      console.log('Dropdown toggle clicked'); // Debugging line
                      setDropdownOpen(prev => !prev);
                    }}
                    variant="link"
                    _hover={{ cursor:"pointer" }}
                  />
                </HStack>
                <Collapse in={isDropdownOpen}>
                  <VStack
                    bg="white"
                    color='blaxk'
                    position="absolute"
                    py={1}
                   px={6}
                    borderRadius={4}
                    border='2px solid black'
                    right={0}
                    top="150%"
                    spacing={3}
                    zIndex={2000}
                  >
                    <HStack onClick={handleLogout} color="black" fontWeight={500} _hover={{cursor:"pointer"}}>
                    <Link  _hover={{ textDecoration: "none" }}>
                      Logout
                    </Link>
                    <Box><RiLogoutCircleRLine /></Box>
                    </HStack>
                  </VStack>
                </Collapse>
              </Box>
            ) : (
              <Box display={{ base: "none", md: "block" }} _hover={{ cursor: "pointer" }}>
                <HStack>
                  <Link onClick={openSignIn} _hover={{ textDecoration: "none" }}>
                    SignIn
                  </Link>
                  <Text>&</Text>
                  <Link onClick={openSignUp} _hover={{ textDecoration: "none" }}>
                    Signup
                  </Link>
                </HStack>
              </Box>
            )}

            {/* Wishlist */}
            <Box display="flex" alignItems="center" gap={2}>
              <Link as={RouterLink} to="/wishlist" display="flex" alignItems="center" _hover={{ textDecoration: "none" }}>
                <Box fontSize={{ base: 25, md: 20 }}>
                  <FaRegHeart />
                </Box>
                <Box display={{ base: "none", md: "block" }} ml={2}>
                  Wishlist
                </Box>
              </Link>
            </Box>

            {/* Cart */}
            <Box gap={2}>
              <Link as={RouterLink} to="/cart" _hover={{ textDecoration: "none" }} display="flex" alignItems="center">
                <Box fontSize={{ base: 25, md: 20 }}>
                  <HiOutlineShoppingBag />
                </Box>
                <Box display={{ base: "none", md: "block" }} ml={2}>
                  Cart
                </Box>
              </Link>
            </Box>

            {/* Admin */}
            <Box display={{ base: "none", md: "flex" }} alignItems="center" gap={2} onClick={adminLog}>
              <Link as={RouterLink} to="/admin" _hover={{ textDecoration: "none" }} display="flex" gap={2}>
                <Box fontSize={22} >
                  <RiAdminLine />
                </Box>
                <Box>Admin</Box>
              </Link>
            </Box>

            {/* Hamburger icon */}
            <Box display={{ sm: "block", md: "none" }}>
              <Hamberger openSignIn={openSignIn} />
            </Box>
          </Box>
        </Box>

        {/* SearchField below Navbar on mobile */}
        <Box display={{ base: "block", md: "none" }} my={2}>
          <SearchField onSearch={handleSearch} />
        </Box>
      </Box>

      {/* SignIn Modal */}
      <Modal isOpen={isSignInOpen} onClose={closeSignIn} isCentered size={{base:"xs", md:"md"}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Login closeSignIn={closeSignIn} openSignUp={openSignUp} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* SignUp Modal */}
      <Modal isOpen={isSignUpOpen} onClose={closeSignUp} isCentered size={{base:"xs", md:"md"}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Register closeSignUp={closeSignUp} openSignIn={openSignIn} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;

