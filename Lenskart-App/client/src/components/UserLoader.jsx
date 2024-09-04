import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Skeleton, SkeletonText } from '@chakra-ui/react';

const UserLoader = () => {
  return (
    <Box mt="10vh" p={4}>
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
            {/* Repeat Skeleton rows to mimic table rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Tr key={index}>
                <Td><Skeleton height="30px" width="40px" /></Td>
                <Td><Skeleton height="30px" width="100px" /></Td>
                <Td><Skeleton height="30px" width="100px" /></Td>
                <Td><Skeleton height="30px" width="150px" /></Td>
                <Td><Skeleton height="30px" width="100px" /></Td>
                <Td><Skeleton height="30px" width="100px" /></Td>
                <Td><Skeleton height="30px" width="30px" /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserLoader;
