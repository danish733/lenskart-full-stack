import React from "react";
import { Box, HStack, Avatar, AvatarBadge,Link } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {

    const navigate = useNavigate()
    const adminfirstName = localStorage.getItem("adminfirstName") || "Admin";

    const handleLogout =()=>{
            localStorage.removeItem("admintoken")
            localStorage.removeItem("adminfirstname")
            navigate("/admin/login")

    }
  return (
    <Box  bg="#FBF9F7"
    display="flex"
    justifyContent="center"
    py={2}
    position="fixed"  // Fixing the position
    top={0}  // Aligning it to the top
    left={0}
    right={0}
    zIndex={1000}  // Ensuring it stays on top of other elements
    boxShadow="sm" >
    <Box
      width="80%"
      height="8vh"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack>
        <Avatar bg="red.500" icon={<AiOutlineUser fontSize="1.5rem" />} />
        <Box fontWeight={500}>Welcome, {adminfirstName}</Box>
      </HStack>
      <HStack
        border="1px solid black"
        borderRadius={4}
        px={4}
        py={1}
        onClick={handleLogout}
        color="black"
        fontWeight={500}
        _hover={{ cursor: "pointer" }}
      >
        <Box>Logout</Box>
        <Box>
          <RiLogoutCircleRLine />
        </Box>
      </HStack>
    </Box>
  </Box>
  );
};

export default AdminNavbar;
