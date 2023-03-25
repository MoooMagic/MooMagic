import React from 'react'
//importing navbar component
import Navbar from '../Navbar/Navbar'
//importing footer component
import Footer from '../Footer/Footer'
import './About.css'
// Fot Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
//about video
import aboutVideo from './Assets/aboutus.mp4'


const About = () => {

  // Go to Service Portion
  const goToAbout = () => {
    const elem = document.getElementById("about");
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
        <Navbar /> 
        <div className="about-container1">
          <h2>Our Products</h2>
          <div className="card-body content-box1">
            <h2 className="card-title"><strong>About Us</strong></h2>
            <button className="ourAbout" onClick={goToAbout}>Our Vision<FontAwesomeIcon className='rightIcon' icon={faArrowRight} /></button>
          </div>
        </div>
        {/*aboutus video*/}
        <div className="about-container2">
          <video src={aboutVideo} className="video-about" autoPlay loop muted />
        </div>

        {/* Services */}
        <div className="container3" id='about'>
          <h2>Our Vision</h2>
          <p>Welcome to Moo-Magic, a platform that connects small dairy farmers with suppliers and potential customers to help establish better opportunities. Our mission is to create a transparent and sustainable marketplace that benefits both farmers and suppliers.

Our story began when we saw the challenges faced by small dairy farmers. Despite their hard work and dedication, many farmers struggle to access larger markets and fair prices for their products. At the same time, customers often face challenges in finding quality, sustainably produced dairy products.

We developed Moo-Magic to address these challenges and create a platform that connects small dairy farmers with customers & big suppliers. Our values are rooted in transparency, sustainability, and fair trade. We believe in creating a level playing field where all farmers, no matter their size, have access to the same opportunities.</p>
        </div>
      <Footer/>
    </>
  )
}

export default About
