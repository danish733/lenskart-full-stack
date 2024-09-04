import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, useToast, VStack, HStack, IconButton,Textarea, Select } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import LoadingIndicator2 from "./LoadingIndicator2";

const AdminEditProduct = () => {

    const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    image: "",
    subImages: [],
    frameType: "",
    frameShape: "",
    frameColor: "",
    frameSize: "",
    framePower: "",
    gender: "",
    brand: "",
    choice: "",
    price: "",
    description: "",
  });
  const admintoken = localStorage.getItem("admintoken");
  const toast = useToast();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchProductDetails = async () => {
        setLoading(true)
      try {
        const response = await axios.get(`https://lenskart-full-stack.onrender.com/product/${id}`, {
          headers: { Authorization: `Bearer ${admintoken}` },
        });
        setProduct(response.data.product);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error);
        toast({
          title: "Error fetching product details.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    };

    fetchProductDetails();
  }, [id, admintoken, toast]);

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubImageChange = (index, value) => {
    const updatedSubImages = [...product.subImages];
    updatedSubImages[index] = value;
    setProduct({ ...product, subImages: updatedSubImages });
  };

  const handleAddSubImage = () => {
    setProduct({ ...product, subImages: [...product.subImages, ""] });
  };

  const handleRemoveSubImage = (index) => {
    const updatedSubImages = [...product.subImages];
    updatedSubImages.splice(index, 1);
    setProduct({ ...product, subImages: updatedSubImages });
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axios.patch(`https://lenskart-full-stack.onrender.com/product/update/${id}`, product, {
        headers: { Authorization: `Bearer ${admintoken}` },
      });
      setLoading(false)
      toast({
        title: "Product updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/admin");
    } catch (error) {
        setLoading(false)
      console.log(error);
      toast({
        title: "Error updating product.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
}
  return (
    <div>
       <Box>
        <AdminNavbar/>
       </Box>
       { loading ? ( <LoadingIndicator2/> ) : ( <Box display="flex" justifyContent="center"  p={4} mt="12vh">
       <Box  width="80%" p={4} boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" >
      <FormControl id="title" >
        <FormLabel>Title</FormLabel>
        <Input name="title" value={product.title} onChange={handleInputChange} placeholder="Product Title" />
      </FormControl>

      <FormControl id="image" mt={4}>
        <FormLabel>Image URL</FormLabel>
        <Input name="image" value={product.image} onChange={handleInputChange} placeholder="Product Image URL" />
      </FormControl>

      <FormControl id="subImages" mt={4}>
        <FormLabel>Sub Images</FormLabel>
        <VStack spacing={2}>
          {product.subImages.map((subImage, index) => (
            <HStack key={index} width="100%">
              <Input
                placeholder={`Sub Image URL ${index + 1}`}
                value={subImage}
                onChange={(e) => handleSubImageChange(index, e.target.value)}
              />
              <IconButton
                aria-label="Remove Sub Image"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleRemoveSubImage(index)}
              />
            </HStack>
          ))}
          <Button onClick={handleAddSubImage} leftIcon={<AddIcon />} colorScheme="blue">
            Add Sub Image
          </Button>
        </VStack>
      </FormControl>

      {/* Add other product fields similarly */}
      {/* Example for frameType */}
      <FormControl id="frameType" mt={4}>
        <FormLabel>Frame Type</FormLabel>
        <Select name="frameType" value={product.frameType} onChange={handleInputChange}>
        <option value="Full Rim">Full Rim</option>
        <option value="Half Rim">Half Rim</option>
        </Select>
      </FormControl>

      {/* Add all other fields like frameShape, frameColor, etc. */}
      <FormControl id="frameShape" mt={4}>
        <FormLabel>Frame Shape</FormLabel>
        <Select name="frameShape" value={product.frameShape} onChange={handleInputChange} >
        <option value="Wayfarer">Wayfarer</option>  
              <option value="Round">Round</option>
              <option value="Geometric">Geometric</option>
              <option value="Square">Square</option>
              <option value="Rectangle">Rectangle</option>
              <option value="Aviator">Aviator</option>
              <option value="Cat Eye">Cat Eye</option>
              <option value="Clubmaster">Round</option>
              <option value="Oval">Round</option>
        </Select>
      </FormControl>

      <FormControl id="frameColor" mt={4}>
        <FormLabel>Frame Color</FormLabel>
        <Select name="frameColor" value={product.frameColor} onChange={handleInputChange}>
        <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Transparent">Transparent</option>
              <option value="Gray">Gray</option>
              <option value="Brown">Brown</option>
              <option value="Pink">Pink</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="White">White</option>
              <option value="Yellow">Yellow</option>
              <option value="Purple">Purple</option>
              <option value="Violet">Violet</option>
        </Select>
      </FormControl>

      <FormControl id="frameSize" mt={4}>
        <FormLabel>Frame Size</FormLabel>
        <Select name="frameSize" value={product.frameSize} onChange={handleInputChange} >
        <option value="Wide">Wide</option>
              <option value="Extra Wide">Extra Wide</option>
              <option value="Narrow">Narrow</option>
              <option value="Medium">Medium</option>
              <option value="Extra Narrow">Extra Narrow</option>
        </Select>
      </FormControl>

      <FormControl id="framePower" mt={4}>
        <FormLabel>Frame Power</FormLabel>
        <Select name="framePower" value={product.framePower} onChange={handleInputChange} placeholder="Frame Power">
        <option value="Zero Power">Zero Power</option>
              <option value="+1 POwer">+1 Power</option>
              <option value="None">None</option>
        </Select>
      </FormControl>

      <FormControl id="gender" mt={4}>
        <FormLabel>Gender</FormLabel>
        <Select name="gender" value={product.gender} onChange={handleInputChange} >
        <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
              <option value="Kids">Kids</option>
        </Select>
      </FormControl>

      <FormControl id="brand" mt={4}>
        <FormLabel>Brand</FormLabel>
        <Select name="brand" value={product.brand} onChange={handleInputChange} >
        <option value="lenskart">Lenskart</option>
              <option value="oakley">Oakley</option>
              <option value="gucci">Gucci</option>
        </Select>
      </FormControl>

      <FormControl id="choice" mt={4}>
        <FormLabel>Choice</FormLabel>
        <Select name="choice" value={product.choice} onChange={handleInputChange} >
        <option value="Lenskart's Choice">Lenskart's Choice</option>
        <option value=" ">None</option>
        </Select>
      </FormControl>

      <FormControl id="price" mt={4}>
        <FormLabel>Price</FormLabel>
        <Input name="price" type="number" value={product.price} onChange={handleInputChange} placeholder="Price" />
      </FormControl>

      <FormControl id="description" mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Product Description"
        />
      </FormControl>

      <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
        Update Product
      </Button>
    </Box>
       </Box> )}
    </div>
  )
}

export default AdminEditProduct
