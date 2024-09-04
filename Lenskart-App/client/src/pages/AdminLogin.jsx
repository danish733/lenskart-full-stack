import React, { useState } from "react";
import { Box, Button, Input, VStack,HStack, Text, IconButton, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiCopy } from "react-icons/fi";

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://lenskart-full-stack.onrender.com/user/admin-login",
        {
          email: form.email,
          password: form.password,
        }
      );

      setLoading(false);

     
      localStorage.setItem("admintoken", response.data.token);
      localStorage.setItem("adminfirstName", response.data.firstName);

      toast({
        title: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        colorScheme:"blue"

      });

      setForm({ email: "", password: "" });

      // Navigate directly to the admin page after login
      navigate("/admin");

      console.log(response.data);
    } catch (error) {
      setLoading(false);

      // Handle error safely
      toast({
        title: error.response?.data?.message || "An error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    });
}

  return (
    <Box>
    <Box display="flex"  justifyContent="center" mt="10vh" fontWeight={500} fontSize={30} textDecoration="underline" >Admin Login Page</Box>
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh" mt="-5vh">
      <Box width="30%" borderRadius={20} p={8} boxShadow="rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px">
      <Box>
      <VStack spacing={0}>
        {/* Email Text with Copy Icon */}
        <Box display="flex" alignItems="center">
          <HStack><Text fontWeight={600}>Email: </Text>  <Text> danishreza@gmail.com</Text>   </HStack>
          <IconButton
            aria-label="Copy Email"
            icon={<FiCopy />}
            size="sm"
            ml={2}
            onClick={() => handleCopy("danishreza@gmail.com")}
            variant="ghost"
          />
        </Box>

        {/* Password Text with Copy Icon */}
        <Box display="flex" alignItems="center">
        <HStack><Text fontWeight={600}>Password: </Text>  <Text> danish123</Text>   </HStack>
          <IconButton
            aria-label="Copy Password"
            icon={<FiCopy />}
            size="sm"
            ml={2}
            onClick={() => handleCopy("danish123")}
            variant="ghost"
          />
        </Box>
      </VStack>
    </Box>
        <Box mt={6}>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                value={form.email}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter Admin Email"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                value={form.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter Admin Password"
              />
            </FormControl>

            <Box display="flex" justifyContent="center" mt={8}>
              <Button
                type="submit"
                border="1px solid black"
                bgColor="white"
                px={10}
                _hover={{ bgColor: "black", color: "white" }}
                isLoading={loading}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default AdminLogin;

