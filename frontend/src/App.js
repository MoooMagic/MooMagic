import React, { useState, useEffect } from 'react'
// CSS
import './App.css'
// Axios
import axios from 'axios'

// All Components
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Privacy from './Components/Privacy/Privacy'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'
import Product from './Components/Product/Product'
import Cart from './Components/Cart/Cart'
import Profile from './Components/Profile/Profile'

// Slicker Carousel
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

// Import React Router Dom
import {
  BrowserRouter, Routes, Route
} from "react-router-dom"
import ProductPage from './Components/ProductPage/ProductPage'
import UserProduct from './Components/UserProduct/UserProduct'

function App() {
  // Search Data UseState
  const [data, setData] = useState("");

  // All Product List
  const [AllProdList, setAllProdList] = useState([]);

  // Use Effect
  useEffect(() => {
    // const x=axios.get('');
    const x = [
      {
        id: 0,
        product_img: "https://patankarfarmproducts.com/wp-content/uploads/2020/08/500-ml-ghee.jpg",
        product_name: "Ghee",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "50L",
        InStock: true,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      },
      {
        id: 1,
        product_img: "https://rukminim1.flixcart.com/image/416/416/l16rde80/milk/s/u/v/1-taaza-homogenised-toned-milk-1-l-tetra-pak-box-toned-amul-original-imagcsyy9spcwwgp.jpeg?q=70",
        product_name: "Milk",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "50L",
        InStock: true,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      },
      {
        id: 2,
        product_img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?resize=960,872",
        product_name: "Milk",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "50L",
        InStock: true,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      }, {
        id: 3,
        product_img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?resize=960,872",
        product_name: "Milk",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "50L",
        InStock: true,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      }, {
        id: 4,
        product_img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?resize=960,872",
        product_name: "Milk",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "500L",
        InStock: false,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      }, {
        id: 5,
        product_img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?resize=960,872",
        product_name: "Milk",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "500L",
        InStock: false,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      }, {
        id: 6,
        product_img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?resize=960,872",
        product_name: "Milk",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "500L",
        InStock: false,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      }, {
        id: 7,
        product_img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?resize=960,872",
        product_name: "Milk",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "500L",
        InStock: false,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      }, {
        id: 8,
        product_img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?resize=960,872",
        product_name: "Milk",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "500L",
        InStock: false,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      }, {
        id: 9,
        product_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4e3tkak8-ZC41Brdo79gK41bk4esyHS3g-49n05p&s",
        product_name: "Milk",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "500L",
        InStock: false,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      }, {
        id: 10,
        product_img: "https://wallpapershome.com/images/wallpapers/pacific-ocean-3840x2160-5k-4k-wallpaper-big-sur-california-beach-389.jpg",
        product_name: "Milk",
        product_desc: "Masti Masti",
        price: 550,
        quantity: "500L",
        InStock: false,
        updatedAt: "2023-03-18T20:32:07.039+00:00"
      }

    ]
    setTimeout(() => {
      setAllProdList(x)
    })
  })

  return (
    <>
      <BrowserRouter>
        <Navbar setData={setData} />
        <Routes>
          <Route exact path="/" element={<Home AllProdList={AllProdList} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/privacy" element={<Privacy />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/products" element={<Product data={data} setData={setData} AllProdList={AllProdList} />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/edit-profile" element={<Profile />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path='/products/:id' element={<ProductPage AllProdList={AllProdList} />} />
          <Route exact path='/user-product' element={<UserProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

