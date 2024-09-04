import React, { useState } from 'react';
import { Box, Text, HStack , Link} from '@chakra-ui/react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiMessageLine } from "react-icons/ri";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MobileFooter = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (title) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [title]: !prevOpenItems[title],
    }));
  };

  const items = [
    { 
      title: 'Eyeglasses', 
      text: 'Lenskart has a wide range of styles that are highly fashionable. You can try out the full-rimmed and half-rimmed eyeglasses that come with various frame and temple materials such as acetate, stainless steel, TR-90, and metal, among others. Rimless spectacles also come in various styles with sporty and elegant temples. Various brands such as Ray-Ban, Oakley, Carrera, John Jacobs, Lee Cooper, and Oakley have an amazing variety of frame and temple styles. The browline, round, rectangular, square, and wayfarer-shaped spectacles are some of the best styles of men’s eyeglasses, and they come with sophisticated as well as sporty frame and temple colours. Spectacles with tortoise shell frames have a vintage appeal, and you can easily choose from the various styles available at Lenskart. Top Brand Eyeglasses - Ray-Ban Eyeglasses, Carrera Eyeglasses, Oakley, Men Eyeglasses, Women Eyeglasses, John Jacob Eyeglasses. Best Styles in Eyeglasses - Full Rim Eyeglasses, Half Rim Eyeglasses, Rimless Eyeglasses, Cat Eye Eyeglasses, Aviator Shapes Eyeglasses, Wayfarer Shapes Eyeglasses.' 
    },
    { 
      title: 'Sunglasses', 
      text: 'Sunglasses help protect the eyes from the damaging UV rays of the sun and have become an essential fashion accessory. Classic styles of shades never go out of fashion as they are reiterated with each trend to suit contemporary style sensibilities. With different combinations of frame and lens colours, sunglasses appeal to all ages irrespective of gender. Luxury eyewear brands such as Linda Farrow and Tom Ford have an excellent collection of aviator-shaped and cat-eye goggles that combine style and luxury. Vogue, Tommy Hilfiger, French Connection, Ray-Ban, John Jacobs, and Vincent Chase offer plenty of sunglasses for women in elegant colours and chic styles. Ray-Ban goggles are popular for their timeless frame designs such as aviator-shaped, wayfarer-shaped, and browline styles, available in various frame and lens colours to match any modern outfit. Brands like Carrera and Calvin Klein offer variations of classic aviator-shaped and wayfarer-shaped goggles with sporty and suave lens colours. Sunglasses for men from top brands such as Hugo Boss, Oakley, and John Jacobs are ideal for various occasions. Popular Sunglasses Brands - Ray-Ban Sunglasses, Oakley Sunglasses, Carrera Sunglasses, IDEE Sunglasses.' 
    },
    { 
      title: 'Contact Lenses', 
      text: 'Lenskart offers a variety of contact lenses from brands like Aqualens, Bausch & Lomb, Johnson & Johnson, Acuvue, Alcon, and Purevision, with options including yearly, monthly, 2-weekly, and daily disposable lenses. Toric contact lenses are also available from these brands. Coloured contact lenses with or without power, featuring UV protection, are available in unique colours such as amethyst, hazel, green, turquoise, blue, brown, and grey. Made from high-quality materials that ensure ample oxygen supply, these lenses fit perfectly on the eyes and are suitable for any occasion. Lenskart also provides a range of contact lens accessories, including top-quality contact lens solutions that are easy to use and help keep your eyes healthy. Popular Contact Lenses Brands - Bausch & Lomb Contact Lenses, Ciba Vision Contact Lenses, Johnson & Johnson Contact Lenses. Contact Lenses by Type - Monthly Disposable, Daily Disposable, Toric Contact Lenses. Lenses Directory.' 
    },
  ];
  

  return (
    <Box display={{ base: "block", md: "none" }} >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Box display='flex' justifyContent='space-between' alignItems='center' onClick={() => toggleItem(item.title)} cursor="pointer">
            <Text fontSize="lg" fontWeight="bold">{item.title}</Text>
            <Box fontSize={20}>
              {openItems[item.title] ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </Box>
          </Box>
          {openItems[item.title] && (
            <Box mt={2} fontSize={12}>
              <Text>{item.text}</Text>
            </Box>
          )}
          <Box mt={4}><hr /></Box>
        </React.Fragment>
      ))}

      <Box mt={10}>
        <Text fontSize={10} fontFamily='serif'>Can we</Text>
        <Text fontSize={25} fontFamily='serif' fontWeight={600} mt={-2}>Help ?</Text>
        <HStack spacing={3}>
            <Box fontSize={15}><RiMessageLine /></Box>
            <Text fontFamily='serif' fontSize={10}>chat with us</Text>
        </HStack>
        <Box mt={4}><hr /></Box>
      </Box>
      <Box>
        <Text my={2} fontSize={10}>Follow Us</Text>
        <HStack ml={-1}>
             <Link href="https://www.facebook.com/" fontSize={30}><CiFacebook /></Link>
                        <Link href="https://www.instagram.com/" fontSize={25}><FaInstagram /></Link>
                        <Link href="https://x.com/" fontSize={25}><FaXTwitter /></Link>
        </HStack>
      </Box>
      <Box mt={4}><hr /></Box>
      <Box display='flex' justifyContent='space-between' fontSize={11}>
        <Box>&#169; All Rights Reserved | www.lenskart.com</Box>
        <Box>Version 1.0.0</Box>
      </Box>
      <Box display='flex' justifyContent='center' >
        <Text my={10}>Made with &#9825;</Text>
      </Box>
    </Box>
  );
}

export default MobileFooter;
