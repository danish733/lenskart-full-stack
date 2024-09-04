import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import UserLoader from './UserLoader';

const AdminUserDetail = () => {
  const [users, setUsers] = useState([]);
  const admintoken = localStorage.getItem("admintoken");
  const toast = useToast();
  const [loading,setLoading] = useState(false)

  const formatDate = (date) => {
    if (!date) return "Not Found"; // Return "Not Found" if date is falsy
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  const fetchUser = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:7035/user/", {
        headers: { Authorization: `Bearer ${admintoken}` },
      });
      setUsers(response.data.users);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast({
        title: "Error fetching users.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`http://localhost:7035/user/delete/${id}`, );
      toast({
        title: "User deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false)
      // Refresh the user list after deletion
      fetchUser();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleting user.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box>
      {/* Admin Navbar */}
      <Box>
        <AdminNavbar />
      </Box>

      {/* User Details Table */}
         { loading ? ( <UserLoader/> ) : (  <Box mt="10vh" p={4}>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Date of Birth</Th>
                <Th>Created At</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <Tr key={user._id}>
                  <Td>{index + 1}</Td>
                  <Td>{user.firstName || "Not Found"}</Td>
                  <Td>{user.lastName || "Not Found"}</Td>
                  <Td>{user.email || "Not Found"}</Td>
                  <Td>{formatDate(user.dob)}</Td>
                  <Td>{formatDate(user.createdAt)}</Td>
                  <Td>
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      aria-label="Delete User"
                      onClick={() => handleDelete(user._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box> )}
    </Box>
  );
};

export default AdminUserDetail;
