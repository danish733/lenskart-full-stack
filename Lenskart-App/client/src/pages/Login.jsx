// Login.jsx
import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, FormErrorMessage, useToast , Link, HStack, Text} from '@chakra-ui/react';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';
import { useNavigate } from 'react-router-dom';

const Login = ({closeSignIn,openSignUp}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    let formErrors = {};
    if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email address";
    }
    if (formData.password === '') {
      formErrors.password = "Password is required";
    }

    if (Object.keys(formErrors).length > 0) {
      setLoading(false)
      setErrors(formErrors);
      toast({
        title: "Validation Error",
        description: "Please correct the errors before submitting.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      setErrors({});
      try {
        const response = await axios.post('https://lenskart-full-stack.onrender.com/user/login', {
          email: formData.email,
          password: formData.password,
        });
        setLoading(false)
        // Save the token in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem("firstName", response.data.firstName)

        toast({
          title: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
          setFormData("")
          closeSignIn()
          navigate("/")
        // Additional actions after successful login (e.g., redirect to dashboard)
        console.log(response.data.token);
      } catch (error) {
        setLoading(false)
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
    <Box  p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired isInvalid={errors.email}>
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

        <Button  mt={8} _hover={{bgColor:"gray.600"}} type="submit" width="100%" bgColor='gray.800' color="white" >
          login  Now
        </Button>
        <HStack display='flex' justifyContent="center" mt={4} >
          <Text> Don't have an account ? <Link fontWeight={500}  textDecoration='underline' color='blue' onClick={() => { closeSignIn(); openSignUp(); }}>Sign Up</Link></Text>
        </HStack>
      </form>
    </Box>
  );
};

export default Login;

