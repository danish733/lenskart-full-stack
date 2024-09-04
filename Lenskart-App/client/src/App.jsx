import { BrowserRouter } from "react-router-dom"
import AllRoutes from "./components/AllRoutes"

import { ChakraProvider } from '@chakra-ui/react'
function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
     <AllRoutes/>
    </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
