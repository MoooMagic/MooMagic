import React, { useState, useEffect } from "react";
// CSS
import "./App.css";
// Axios
import axios from "axios";

// All Components
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Privacy from "./Components/Privacy/Privacy";
import SignUp from "./Components/SignUp/SignUp";
import SignUpSeller from "./Components/SignUpSeller/SignUpSeller";
import SignUpRetailer from "./Components/SignUpRetailer/SignUpRetailer";
import SignIn from "./Components/SignIn/SignIn";
import Product from "./Components/Product/Product";
import Cart from "./Components/Cart/Cart";
import Profile from "./Components/Profile/Profile";
import ProductPage from "./Components/ProductPage/ProductPage";
import UserProduct from "./Components/UserProduct/UserProduct";
import AddUserProduct from "./Components/AddUserProduct/AddUserProduct";

// Slicker Carousel
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

// Import React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SliderBoxProf from "./Components/SliderBoxProf/SliderBoxProf";

function App() {
  // Search Data UseState
  const [data, setData] = useState("");

  // All Product List
  const [AllProdList, setAllProdList] = useState([]);

  const [loading, setLoading] = useState(true);

  // Use Effect
  useEffect(() => {
    async function fetchallproducts() {
      try {
        const res = await axios.get("http://localhost:5000/api/product/allproducts")
        setAllProdList(res.data)
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchallproducts();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar setData={setData} />
        <SliderBoxProf />
        <Routes>
          <Route exact path="/" element={<Home AllProdList={AllProdList} loading={{ loading, setLoading }} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/privacy" element={<Privacy />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signup-seller" element={<SignUpSeller />} />
          <Route exact path="/signup-retailer" element={<SignUpRetailer />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route
            exact
            path="/products"
            element={
              <Product
                data={data}
                setData={setData}
                AllProdList={AllProdList}
                loading={{ loading, setLoading }}
              />
            }
          />
          <Route exact path="/profile" element={<Profile loading={{ loading, setLoading }} />} />
          <Route exact path="/edit-profile" element={<Profile loading={{ loading, setLoading }} />} />
          <Route exact path="/cart" element={<Cart loading={{ loading, setLoading }}/>} />
          <Route
            exact
            path="/products/:id"
            element={<ProductPage AllProdList={AllProdList} loading={{ loading, setLoading }} />}
          />
          <Route exact path="/user-product" element={<UserProduct loading={{ loading, setLoading }} />} />
          <Route exact path="/add-product" element={<AddUserProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
