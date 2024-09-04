// src/components/SearchField.jsx
import React, { useState } from 'react';
import { InputGroup, InputLeftElement, Input, IconButton, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchField = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <InputGroup >
      <InputLeftElement 
        display={{ base: "block", md: "none" }}>
          <Icon as={SearchIcon} color="black" ml={7} mt={3} fontSize={17}/>
        </InputLeftElement>
      <Input
       width={{base:"90vw"}}
       marginLeft={{base:"4"}}
        placeholder="Explore the latest trends"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        borderColor={"blue.700"}
        _focus={{
            borderColor: 'blue.700',
            boxShadow: 'none'
          }}
          _hover={{borderColor:"none"}}
          pl={{ base: "10", md: "2" }} 
      />
      
    </InputGroup>
  );
};

export default SearchField;
