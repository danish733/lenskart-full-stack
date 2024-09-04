import React from "react";
import {
  Box,
  Skeleton,
  SkeletonText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const AdminProductLoader = () => {
  return (
    <Box mt="8vh" p={4}>
      {/* Skeletons for Buttons */}
      <Box display="flex" justifyContent="center">
        <Box mt={6} display="flex" width="90%" justifyContent="space-evenly">
          <Skeleton height="40px" width="150px" borderRadius="md" />
          <Skeleton height="40px" width="150px" borderRadius="md" />
          <Skeleton height="40px" width="150px" borderRadius="md" />
        </Box>
      </Box>

      {/* Skeletons for Table Rows */}
      <Box display="flex" justifyContent="center">
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <Tr key={index}>
                    <Td>
                      <Skeleton height="20px" width="10px" />
                    </Td>
                    <Td>
                      <Skeleton height="50px" width="50px" borderRadius="md" />
                    </Td>
                    <Td>
                      <SkeletonText mt="4" noOfLines={1} spacing="4" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="30px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="30px" />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProductLoader;


