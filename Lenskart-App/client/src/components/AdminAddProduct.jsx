import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  VStack,
  Select,
  HStack,
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingIndicator2 from "./LoadingIndicator2";

const AdminAddProduct = () => {
  const [productData, setProductData] = useState({
    image: "",
    subImages: [], // This will store multiple image links
    title: "",
    frameType: "",
    frameShape: "",
    frameColor: "",
    frameSize: "",
    framePower: "",
    gender: "",
    brand: "",
    choice:"",
    price: "",
    description: "",
  });
  const [subImageInput, setSubImageInput] = useState(""); // For handling subimages input

  const admintoken = localStorage.getItem("admintoken");
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubImage = () => {
    if (subImageInput.trim()) {
      setProductData((prev) => ({
        ...prev,
        subImages: [...prev.subImages, subImageInput.trim()],
      }));
      setSubImageInput(""); 
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(
        "https://lenskart-full-stack.onrender.com/product/create",
        productData,
        {
          headers: { Authorization: `Bearer ${admintoken}` },
        }
      );
      setLoading(false)
      console.log(response.data.message);
      alert(response.data.message);
      setSubImageInput("");
      setProductData({
        image: "",
    subImages: [], // This will store multiple image links
    title: "",
    frameType: "",
    frameShape: "",
    frameColor: "",
    frameSize: "",
    framePower: "",
    gender: "",
    brand: "",
    choice:"",
    price: "",
    description: "",
      })
    } catch (error) {
      console.log(error);
      setLoading(false)
      alert("Error adding product");
    }
  };

  if (!admintoken) {
    navigate("/admin/login");
    return null;
  }

  return (
    <Box>
      <AdminNavbar />
      {loading ?  ( <LoadingIndicator2/> ) : ( <Box mt="10vh" p={4} display="flex" justifyContent="center" pt={4}>
        <Box   width="80%" p={4} boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px">
            <Box display="flex" justifyContent="center"><Box fontSize={30} fontWeight={500} textDecoration="underline">Add Product</Box></Box>
        <VStack spacing={4} as="form" onSubmit={handleCreate}>
          {/* Product Image */}
          <FormControl isRequired>
            <FormLabel>Product Image URL</FormLabel>
            <Input
              type="text"
              name="image"
              value={productData.image}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* SubImages */}
          <FormControl isRequired>
            <FormLabel>Sub Images URL</FormLabel>
            <HStack>
              <Input
                type="text"
                value={subImageInput}
                onChange={(e) => setSubImageInput(e.target.value)}
                placeholder="Enter sub-image URL"
              />
              <Button onClick={handleAddSubImage}>Add</Button>
            </HStack>
            <Box mt={2}>
              {productData.subImages.map((img, index) => (
                <Box key={index} p={1} border="1px solid" borderRadius="md">
                  {img}
                </Box>
              ))}
            </Box>
          </FormControl>

          {/* Other Form Fields */}
         

          {/* Dropdown Fields */}
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" width="100%" gap={14}  justifyContent="space-between">
            <FormControl isRequired>
            <FormLabel>Frame Type</FormLabel>
            <Select
              name="frameType"
              placeholder="Select Frame Type"
              value={productData.frameType}
              onChange={handleInputChange}
            >
              <option value="Full Rim">Full Rim</option>
              <option value="Half Rim">Half Rim</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Frame Shape</FormLabel>
            <Select
              name="frameShape"
              placeholder="Select Frame Shape"
              value={productData.frameShape}
              onChange={handleInputChange}
            >
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

          <FormControl isRequired>
            <FormLabel>Frame Color</FormLabel>
            <Select
              name="frameColor"
              placeholder="Select Frame Color"
              value={productData.frameColor}
              onChange={handleInputChange}
            >
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

          <FormControl isRequired>
            <FormLabel>Frame Size</FormLabel>
            <Select
              name="frameSize"
              placeholder="Select Frame Size"
              value={productData.frameSize}
              onChange={handleInputChange}
            >
              <option value="Wide">Wide</option>
              <option value="Extra Wide">Extra Wide</option>
              <option value="Narrow">Narrow</option>
              <option value="Medium">Medium</option>
              <option value="Extra Narrow">Extra Narrow</option>
            </Select>
          </FormControl>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" width="100%" gap={14}  justifyContent="space-between">
            <FormControl isRequired>
            <FormLabel>Frame Power</FormLabel>
            <Select
              name="framePower"
              placeholder="Select Frame Power"
              value={productData.framePower}
              onChange={handleInputChange}
            >
              <option value="Zero Power">Zero Power</option>
              <option value="+1 POwer">+1 Power</option>
              <option value="None">None</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              placeholder="Select Gender"
              value={productData.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
              <option value="Kids">Kids</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Brand</FormLabel>
            <Select
              name="brand"
              placeholder="Select Brand"
              value={productData.brand}
              onChange={handleInputChange}
            >
              <option value="lenskart">Lenskart</option>
              <option value="oakley">Oakley</option>
              <option value="gucci">Gucci</option>
            </Select>
          </FormControl>
{/* choice  */}
          <FormControl >
            <FormLabel>choice</FormLabel>
            <Select
              name="choice"
              placeholder="Select choice"
              value={productData.choice}
              onChange={handleInputChange}
            >
              <option value="Lenskart's Choice">Lenskart's Choice</option>
              <option value=" ">None</option>
            </Select>
          </FormControl>

            </Box>
          </Box>
           
           <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" width="100%" gap={14}  justifyContent="space-between">
            <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
            />
          </FormControl>
                 {/* Price and Description */}
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </FormControl>
            </Box>
           </Box>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" colorScheme="blue" mt={4}>
            Add Product
          </Button>
        </VStack>
        </Box>
      </Box> )}
    </Box>
  );
};

export default AdminAddProduct;


