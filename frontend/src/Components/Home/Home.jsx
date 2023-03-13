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
// StartIcon
import StarIcon from '@mui/icons-material/Star';
// Rupee Icon
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// Slider
import Slider from "react-slick";

// Products Images
import suhanaGhee from './Assets/suhanaGhee.webp'
import cowMilk from './Assets/cowMilk.jpg'
import Butter from './Assets/Butter.webp'
import Paneer from './Assets/paneer.webp'
import patanjaliGhee from './Assets/patanjaliGhee.jpg'
import amulMilk from './Assets/amulMilk.webp'

const Home = () => {

    const navigate = useNavigate();

    // Go to Service Portion
    const goToServices = () => {
        const elem = document.getElementById("services");
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Static Product List
    const Product = [
        {
            productLogo: suhanaGhee,
            productName: "SUHANA Pure Cow Ghee 500 ml Plastic Bottle",
            productRating: "4.2",
            productTotalRate: "273",
            productTotalPrice: 335,
            productMainPrice: 400,
        },
        {
            productLogo: cowMilk,
            productName: "Organic Cow Milk | 1 Lt. Glass Bottle",
            productRating: "4.1",
            productTotalRate: "200",
            productTotalPrice: 100,
            productMainPrice: 150,
        },
        {
            productLogo: Butter,
            productName: "The Good Cow Co - Pure A2+ Artisan Unsalted White Butter - 100% Natural - Tasty & Delicious (White Butter 400 Gram)",
            productRating: "4.0",
            productTotalRate: "170",
            productTotalPrice: 262,
            productMainPrice: 269,
        },
        {
            productLogo: Paneer,
            productName: "Gowardhan Classic Block Paneer (200g)",
            productRating: "4.2",
            productTotalRate: "113",
            productTotalPrice: 88,
            productMainPrice: 105,
        },
        {
            productLogo: patanjaliGhee,
            productName: "Patanjali Cow's Ghee, 1L",
            productRating: "4.4",
            productTotalRate: "662",
            productTotalPrice: 660,
            productMainPrice: 665,
        },
        {
            productLogo: amulMilk,
            productName: "Amul Gold",
            productRating: "4.4",
            productTotalRate: "101",
            productTotalPrice: 25,
            productMainPrice: 35,
        }
    ]

    // Map the Product
    const prodList = Product.map((elem, index) =>
        <div className="card" key={index}>
            <img src={elem.productLogo} className="card-img-top" alt="" />
            <div className="card-body">
                <p className="card-text">{elem.productName}</p>
                <div className="rate">
                    <button className="rateBtn">{elem.productRating}<StarIcon /></button>
                    <button className="rateText">({elem.productTotalRate})</button>
                </div>
                <div className="price">
                    <p><strong><CurrencyRupeeIcon />{elem.productTotalPrice}</strong></p>
                    <p className="fadePrice">
                        <CurrencyRupeeIcon />{elem.productMainPrice}
                    </p>
                    <p className="percent">
                        {(((elem.productMainPrice - elem.productTotalPrice) * 100) / elem.productMainPrice).toFixed(2)}% off
                    </p>
                </div>
            </div>
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
        ]
    };

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

                {/* Our Products */}
                <div className="container4">
                    <h2>Our Products</h2>
                    <div className="boxHome">
                        <Slider {...settings}>
                            {prodList}
                        </Slider>
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
                <div className="container3" id='services'>
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
            <Footer />
        </>
    )
}

export default Home
