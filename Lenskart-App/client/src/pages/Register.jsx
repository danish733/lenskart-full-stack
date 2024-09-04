import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, FormErrorMessage, useToast, HStack, Text, Link } from "@chakra-ui/react";
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';

const Register = ({ openSignIn, closeSignUp }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const toast = useToast();
  const [loading, setLoading] = useState(false); // Set initial loading state to false

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    let formErrors = {};
    if (formData.firstName.length < 2) {
      formErrors.firstName = "First name must be at least 2 letters.";
    }
    if (formData.lastName.length < 2) {
      formErrors.lastName = "Last name must be at least 2 letters.";
    }
    if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email address";
    }
    if (!validatePassword(formData.password)) {
      formErrors.password = "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.";
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false); // Stop loading if there are errors
      toast({
        title: "Please correct the errors before submitting.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      setErrors({});
      try {
        const response = await axios.post('https://lenskart-full-stack.onrender.com/user/register', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: "user", // You can change the role as needed
        });

        setLoading(false); // Stop loading after a successful registration

        toast({
          title: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        // Optionally, you can reset the form after a successful registration
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        // Close the sign-up modal and open sign-in modal after successful registration
        closeSignUp();
        openSignIn();

      } catch (error) {
        setLoading(false); // Stop loading if there is an error during registration
        toast({
          title: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' p={5}>
      <form onSubmit={handleSubmit}>
        <Box display='flex' justifyContent='space-between' alignItems='center' gap={5}>
          <FormControl id="firstName" isRequired isInvalid={errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && <FormErrorMessage>{errors.firstName}</FormErrorMessage>}
          </FormControl>

          <FormControl id="lastName" isRequired mt={4} isInvalid={errors.lastName} marginTop={-0.9}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && <FormErrorMessage>{errors.lastName}</FormErrorMessage>}
          </FormControl>
        </Box>

        <FormControl id="email" isRequired mt={4} isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>

        <FormControl id="password" isRequired mt={4} isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
        </FormControl>

        <FormControl id="confirmPassword" isRequired mt={4} isInvalid={errors.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
        </FormControl>

        <Button mt={8} _hover={{ bgColor: "gray.600" }} type="submit" width="100%" bgColor='gray.800' color="white">
          Create an Account
        </Button>
        <HStack display='flex' justifyContent="center" mt={4}>
          <Text>Have an account? <Link fontWeight={500} textDecoration='underline' color='blue' onClick={() => { closeSignUp(); openSignIn(); }}>Sign In</Link></Text>
        </HStack>

      </form>
    </Box>
  );
}

export default Register;


