import React, { useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { IoIosArrowDown } from 'react-icons/io';
import { Box, Text, HStack, Input, Button } from '@chakra-ui/react';

const Location = () => {
  const [location, setLocation] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [addedLocation, setAddedLocation] = useState('');

  const handleLocationChange = (e) => {
    const locationValue = e.target.value;
    setLocation(locationValue);
  };

  const handleAddLocation = () => {
    if (location.length > 10) {
      setAddedLocation(location.substring(0, 10) + '...');
    } else {
      setAddedLocation(location);
    }
    setShowInput(false);
  };

  const handleShowInput = () => {
    setShowInput(true);
  };
  const token = localStorage.getItem('token');
  const firstName = localStorage.getItem("firstName")

  return (
    <div>
      <Box display='flex' py={2} alignContent='center' alignItems='center'>
        <Box fontSize={30} px={3}>
          <FaCircleUser />
        </Box>
        <Box fontSize={12}>
          {token ? <Box fontSize={12} color="red" fontWeight='bold'>Welcome, {firstName}</Box> : <Box>
            <Text fontSize={12} color="red" fontWeight='bold'>
            Get Fastest Delivery
          </Text>
          </Box> }
          {showInput ? (
            <HStack spacing={1}>
              <Input
                value={location}
                onChange={handleLocationChange}
                placeholder="Add Location"
                size="sm"
              />
              <Button size="sm" onClick={handleAddLocation}>
                Add
              </Button>
            </HStack>
          ) : (
            <HStack spacing={1}>
              <Text fontWeight={500} onClick={handleShowInput}>
                {addedLocation ? addedLocation : 'Add Location'}
              </Text>
              <Box fontSize={16}>
                {addedLocation ? null : <IoIosArrowDown />}
              </Box>
            </HStack>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Location;
