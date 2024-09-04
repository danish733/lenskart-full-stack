import React from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'

const MProductView = () => {
    const {id} = useParams()
  return (
    <div>
      <Box>
        <Box> <Navbar/> </Box>
        <Box mt="12vh">
            <Box>product id =  {id}</Box>
        </Box>
      </Box>
    </div>
  )
}

export default MProductView
