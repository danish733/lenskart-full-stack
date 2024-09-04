import React, {useState} from "react";
import { Box , Text, Image, HStack, Button, useBreakpointValue} from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import MobileFooter from "./MobileFooter";
const Footer = () => {
    const [showMore, setShowMore] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });
  
    const handleToggle = () => setShowMore(!showMore);
    
    const sections = {
        Services: ["Store Locator", "Buying Guide", "Frame Promoter"],
        About: ["We Are Hiring", "Refer And Earn", "About Us", "Lenskart Coupons"],
        Help: ["FAQ's"]
    };
  return (
    <div>
      <Box
        width="100%"
        bgColor="#000042"
        color="white"
        px={{ base: 4, md: 20 }}
        py={{ base: 3, md: 2 }}
      >
        <Box >

            {/* text of lenskart  */}
            <Box >
                <Text fontSize={{base:18, md:40}} fontWeight={{base:700, md:"block"}} py={3} >Buy The Best Eyewear From Lenskart</Text>
                <Text pb={3}>
            {isMobile ? (
              <>
                {/* Conditionally render the first line or full text based on showMore state */}
                {!showMore && (
                  <Text>
                    Lenskart Is The Leading E-Commerce Portal For Eyewear In India.
                  </Text>
                )}
                {showMore && (
                  <>
                    <Text fontSize={12}>
                      Lenskart Is The Leading E-Commerce Portal For Eyewear In India. It Has Revolutionised The Eyewear Industry In The Country With Its Omni-Channel Approach. From An Ever-Growing Number Of Offline Stores Across Major Cities In The Country To Innovative Integration Of Technology While Purchasing Online, Lenskart Caters To Every Customer With Several Deals And Offers.
                    </Text>
                    <Text fontSize={12} py={3}>
                      A One-Stop Online Solution For Purchasing Eyewear And Its Accessories, Lenskart Delivers Them Right At Your Doorstep With Convenient Methods Of Payment. Sunglasses as well as Eyeglasses Are Available For Men And Women In A Diverse Array Of Styles And Trendy Colours. If You Want To Try Out Contact Lenses, Pick The Ones Of Your Choice From The Extensive Variety Of Coloured Contact Lenses From Our Online Store.
                    </Text>
                  </>
                )}
                <HStack spacing={-6} onClick={handleToggle}>
                <Button textDecoration='underline' variant="link" color='white' fontSize={14}  mt={2}>
                  {showMore ? "Show Less" : "Show More"}
                </Button>
                  <Box mt={2}> <MdKeyboardArrowDown fontSize={30}/></Box>
                </HStack>
              </>
            ) : (
              <Box>
                <Text>
                Lenskart Is The Leading E-Commerce Portal For Eyewear In India. It Has Revolutionised The Eyewear Industry In The Country With Its Omni-Channel Approach. From An Ever-Growing Number Of Offline Stores Across Major Cities In The Country To Innovative Integration Of Technology While Purchasing Online, Lenskart Caters To Every Customer With Several Deals And Offers.
              </Text>
              <Text py={5}>
              A One-Stop Online Solution For Purchasing Eyewear And Its Accessories, Lenskart Delivers Them Right At Your Doorstep With Convenient Methods Of Payment. Sunglasses as well as Eyeglasses Are Available For Men And Women In A Diverse Array Of Styles And Trendy Colours. If You Want To Try Out Contact Lenses, Pick The Ones Of Your Choice From The Extensive Variety Of Coloured Contact Lenses From Our Online Store.
              </Text>
              </Box>

              
            )}
          </Text>
            </Box>

            {/* servies about us help  */}
            <Box display={{base:'none', md:"flex"}} mt={20} >
                <Box flex={3} >
                  <Box display='flex' height='auto'>
                  {Object.entries(sections).map(([title, items], index) => (
                        <Box key={index} pr={20} >
                            <Text fontSize={25} fontWeight={500}  color="white" mb={3}>
                                {title}
                            </Text>
                            {items.map((item, i) => (
                                <Text key={i} color="white" py={2} fontSize={14} cursor='pointer'>
                                    {item}
                                </Text>
                            ))}
                        </Box>
                    ))}
                  </Box>
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' textAlign='center' flex={1} >
                    <Box display='flex' justifyContent='center' columnGap={2}>
                       <Link href="https://play.google.com/store/apps/details?id=com.lenskart.app&hl=en_IN&pli=1"> <Image src="https://static.lenskart.com/media/desktop/img/play-store.svg"></Image></Link>
                        <Link href="https://apps.apple.com/us/app/lenskart-eyewear/id970343205"><Image src="https://static.lenskart.com/media/desktop/img/app-store.svg"></Image></Link>
                    </Box>
                    <Box mt={4}>
                        <Text>Download Lenskart App to buy</Text>
                        <Text mt={-1}>Eyeglasses, Sunglasses and Contact Lenses</Text>
                    </Box>
                </Box>
            </Box>

            {/* social media  */}
            <Box pb={6} display={{base:"none" , md:'block'}}>
                <Box my={8}><hr color="white"/></Box>
                <Box display='flex' justifyContent='space-between'>
                    <Box flex={3}>
                        <HStack spacing={4}>
                            <Text>T & C</Text>
                            <Text>Privacy</Text>
                            <Text>Disclaimer</Text>
                        </HStack>
                    </Box>
                    <Box flex={1} pl={10} >
                        <HStack spacing={4}>
                        <Text>Version 1.0.0  ||  Follow Us</Text>
                        <Link href="https://www.facebook.com/" fontSize={30}><CiFacebook /></Link>
                        <Link href="https://www.instagram.com/" fontSize={25}><FaInstagram /></Link>
                        <Link href="https://x.com/" fontSize={25}><FaXTwitter /></Link>
                        </HStack>
                    </Box>
                </Box>
            </Box>
            {/* mobile footer  */}
            <MobileFooter/>
        </Box>
      </Box>
    </div>
  );
};

export default Footer;
