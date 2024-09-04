import React from 'react'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import Glasses from '../components/Glasses'
import Slider from '../components/Slider'
import Discover from '../components/Discover'
import Trend from '../components/Trend'
import ContactBanner from '../components/ContactBanner'
import Footer from '../components/Footer'
import MTabs from '../Mobile/MTabs'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Navbar2/>
      <Glasses/>
      <Slider/>
      <MTabs/>
      <Discover/>
      <Trend/>
      <ContactBanner/>
      <Footer/>
    
    </div>
  )
}

export default Home
