import React from 'react'
// CSS
import './Home.css'
// Fot Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
// Let Out Image
import letOut from './Assets/letOut.png'
// Let In Image
import letIn from './Assets/letIn.png'
// Let After Image
import letAfter from './Assets/letAfter.png'
// Footer
import Footer from '../Footer/Footer'
// UseNavigate
import { useNavigate } from 'react-router-dom'
// Video
import cowFarmer from './Assets/cowFarmer.mp4'

const Home = () => {

  const navigate = useNavigate();

  // Go to Service Portion
  const goToServices = () => {
    const elem = document.getElementById("services");
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <div className="box">
        {/* Welcome Page */}
        <div className="container1">
          {/* Video */}
          <video src={cowFarmer} autoPlay loop muted />
          {/* Text */}
          <div className="card-body content-box">
            <h2 className="card-title">Welcome to the <strong>Moo Magic !</strong></h2>
            <p className="card-text">One stop platform where magic begins with farmers.</p>
            <button className="knowMore" onClick={() => { navigate("/about") }}>Know More<FontAwesomeIcon className='rightIcon' icon={faArrowRight} /></button>

            <div className="cont">
              {/* SignUp */}
              <button className="btn btn-outline-success" onClick={() => { navigate("/signup") }}>SIGN UP</button>
              {/* SignIn */}
              <button className="btn btn-primary" onClick={() => { navigate("/signin") }}>SIGN IN</button>
            </div>
          </div>
        </div>


        {/* Products */}
        <div className="container2">
          <h2>Our Products</h2>
          <div className="card-body content-box1">
            <h2 className="card-title"><strong>Milky Way</strong> of many more products . . .</h2>
            <button className="ourServices" onClick={goToServices}>Our Services<FontAwesomeIcon className='rightIcon' icon={faArrowRight} /></button>
          </div>
        </div>

        {/* Services */}
        <div className="container3" id='services'>
          <h2>Our Services</h2>
          <div className="content-box2">
            {/* Let Out */}
            <div className="servicesBox card" style={{ backgroundColor: "#5A5FE2" }}>
              <img src={letOut} alt="" className="servicesImg card-img-top" />
              <div className="card-body" >
                <h2 className="card-title">Let Out</h2>
                <p className="card-text">We let out our platform to create an account so that farmers can list their dairy products to make their business profitable in very simple steps.</p>
              </div>
            </div>

            {/* Let In */}
            <div className="servicesBox card" style={{ backgroundColor: "#DDFFDE" }}>
              <img src={letIn} alt="" className="servicesImg card-img-top" />
              <div className="card-body" >
                <h2 className="card-title">Let In</h2>
                <p className="card-text">We let in farmers and their products through our websites for selling products with zero efforts and marketing.</p>
              </div>
            </div>

            {/* Let After */}
            <div className="servicesBox card" style={{ backgroundColor: "#FFDDDD" }}>
              <img src={letAfter} alt="" className="servicesImg card-img-top" />
              <div className="card-body" >
                <h2 className="card-title">Let After</h2>
                <p className="card-text">We let in farmers and their products through our websites for selling products with zero efforts and marketing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
