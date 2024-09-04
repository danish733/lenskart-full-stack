import React from 'react'
import { Box } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Tab1 from './Tab1'
const MTabs = () => {
  return (
    <Box display={{base:"block", md:"none"}}>
      <Tabs>
  <TabList >
    <Tab fontWeight={600} color="gray" _selected={{ color: "black", borderBottom: "2px solid black" }}>All</Tab>
    <Tab fontWeight={600}  color="gray" _selected={{ color: "black", borderBottom: "2px solid black" }}>On Sale</Tab>
    <Tab fontWeight={600}  color="gray" _selected={{ color: "black", borderBottom: "2px solid black" }}>Premium</Tab>
    <Tab fontWeight={600}  color="gray" _selected={{ color: "black", borderBottom: "2px solid black" }}>Hustlr</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
          <Tab1/>
    </TabPanel>
    <TabPanel>
      <p>this is on sale tab panel</p>
    </TabPanel>
    <TabPanel>
      <p>this is premium tab panel</p>
    </TabPanel>
    <TabPanel>
      <p>this is hustlr tab panel</p>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
  )
}

export default MTabs
