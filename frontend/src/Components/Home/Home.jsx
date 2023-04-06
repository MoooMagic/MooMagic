import React, { useState } from 'react'
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
// UseNavigate
import { useNavigate } from 'react-router-dom'
// Video
import cowFarmer from './Assets/cowFarmer.mp4'
// Rupee Icon
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// Slider
import Slider from "react-slick";

import SliderBoxProf from '../SliderBoxProf/SliderBoxProf'

import { Link } from 'react-router-dom'

const Home = (props) => {

    const navigate = useNavigate();

    // Go to Service Portion
    const goToServices = () => {
        const elem = document.getElementById("services");
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Map the Product
    const prodList = props.AllProdList.slice(0, 6).map((elem, index) =>
        <div className="card" style={{ width: '17rem' }} key={index}>
            {/* Product Img */}
            <img src={elem.product_img} alt="" className='card-img-top' />
            {/* Product Body */}
            <div className="card-body">
                {/* Product Name */}
                <h5 className="card-title">{elem.product_name}</h5>
                {/* Product Tetx */}
                <p className="card-text">{elem.product_desc}</p>
                {/* In Stock */}
                <button className='stock' style={{ backgroundColor: elem.InStock ? 'dodgerblue' : 'rgb(255, 70, 45)' }}>{elem.InStock ? 'In Stock' : 'Out of Stock'}</button>
                {/* Price */}
                <div className="price">
                    <p style={{ marginBottom: '0px' }}><strong><CurrencyRupeeIcon />{elem.price}</strong></p>
                    <p className="fadePrice" style={{ marginBottom: '0px' }}>
                        {elem.quantity}
                    </p>
                </div>
            </div>
            <Link to={`/products/${elem.id}`} className="btn btn-outline-info align-self-center" style={{ margin: '0 40%' }}>View</Link>
        </div>
    );

    // Slider Responsive
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <>
            <div className="box">
                {/* Welcome Page */}
                <div className="container1">
                    <SliderBoxProf />
                    {/* Video */}
                    <video src={cowFarmer} autoPlay loop muted />
                    {/* Text */}
                    <div className="card-body content-box">
                        <h2 className="card-title">Welcome to the <strong>Moo Magic !</strong></h2>
                        <p className="card-text">One stop platform where magic begins with farmers.</p>
                        <button className="knowMore" onClick={() => { navigate("/about") }}>Know More<FontAwesomeIcon className='rightIcon' icon={faArrowRight} /></button>

                        {/* If the User is Not Logged In then Show SignUp & Sign In Button */}
                        {localStorage.getItem('token') === null ?
                            <>
                                <div className="cont">
                                    {/* SignUp */}
                                    <button className="btn btn-outline-success" onClick={() => { navigate("/signup") }}>SIGN UP</button>
                                    {/* SignIn */}
                                    <button className="btn btn-primary" onClick={() => { navigate("/signin") }}>SIGN IN</button>
                                </div>
                            </> : ''}
                    </div>
                </div>

                {/* Our Products */}
                <div className="container4">
                    <h2>Our Products</h2>
                    <div className="boxHome">
                        <Slider {...settings}>
                            {prodList}
                        </Slider>
                        <div className="text-center">
                            <button type="button" className="btn btn-warning cursor-pointer text-dark my-3" onClick={() => navigate('/products')}>View More Products..</button>
                        </div>
                    </div>
                </div>

                {/* Milky Way */}
                <div className="container2">
                    <div className="card-body content-box1">
                        <h2 className="card-title"><strong>Milky Way</strong> of many more products . . .</h2>
                        <button className="ourServices" onClick={goToServices}>Our Services<FontAwesomeIcon className='rightIcon' icon={faArrowRight} /></button>
                    </div>
                </div>

                {/* Services */}
                <div className="container7" id='services'>
                    <h2>Our Services</h2>
                    <div className="content-box2">
                        {/* Let Out */}
                        <div className="servicesBox card" style={{ backgroundColor: "#5A5FE2" }}>
                            <img src={letOut} alt="" className="servicesImg card-img-top" />
                            <div className="card-body" >
                                <h3 className="card-title">Let Out</h3>
                                <p className="card-text">We let out our platform to create an account so that farmers can list their dairy products to make their business profitable in very simple steps.</p>
                            </div>
                        </div>

                        {/* Let In */}
                        <div className="servicesBox card" style={{ backgroundColor: "#DDFFDE" }}>
                            <img src={letIn} alt="" className="servicesImg card-img-top" />
                            <div className="card-body" >
                                <h3 className="card-title">Let In</h3>
                                <p className="card-text">We let in farmers and their products through our websites for selling products with zero efforts and marketing.</p>
                            </div>
                        </div>

                        {/* Let After */}
                        <div className="servicesBox card" style={{ backgroundColor: "#FFDDDD" }}>
                            <img src={letAfter} alt="" className="servicesImg card-img-top" />
                            <div className="card-body" >
                                <h3 className="card-title">Let After</h3>
                                <p className="card-text">We let in farmers and their products through our websites for selling products with zero efforts and marketing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
