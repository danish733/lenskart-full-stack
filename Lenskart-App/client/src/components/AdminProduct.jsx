import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  IconButton,
  TableContainer,
  Heading,
  useToast,
  Button
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminProductLoader from "./AdminProductLoader";

const AdminProduct = () => {
  const [product, setProduct] = useState([]);
  const admintoken = localStorage.getItem("admintoken");
  const toast = useToast();
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:7035/product/", {
        headers: { Authorization: `Bearer ${admintoken}` },
      });

      setProduct(response.data.product);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast({
        title: "Error fetching products.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/editproduct/${id}`)
  };

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`http://localhost:7035/product/delete/${id}`, {
        headers: { Authorization: `Bearer ${admintoken}` },
      });
      setLoading(false)
      toast({
        title: "Product deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
  
      // Refresh the product list after deletion
      fetchProduct();
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast({
        title: "Error deleting product.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
     <div>
        { loading ? ( <AdminProductLoader/> ) : ( <Box  mt="8vh" p={4}>
            <Box display="flex" justifyContent='center'>
                <Box mt={6} display="flex" width="90%" justifyContent='space-evenly'>
                    <Button colorScheme="blue" onClick={()=>{ navigate("/admin/addproduct")}}>Add Product</Button>
                    <Button colorScheme="blue" onClick={()=>{ navigate("/admin/userdetail")}}>View User Details</Button>
                    <Button colorScheme="blue" onClick={()=>{ navigate("/admin/admindetail")}}>View Admin Details</Button>
                </Box>
                </Box>
            <Box display="flex" justifyContent='center' >
            <Box p={4} width="90%">
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Image</Th>
              <Th>Title</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {product.map((item, index) => (
              <Tr key={item._id}>
                <Td>{index + 1}</Td>
                <Td>
                  <Image
                    src={item.image} // Adjust based on your image path
                    alt={item.title}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Td>
                <Td>{item.title}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => handleEdit(item._id)}
                    aria-label="Edit Product"
                  />
                </Td>
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(item._id)}
                    aria-label="Delete Product"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
            </Box>
        </Box> )}
     </div>
  );
};

export default AdminProduct;

