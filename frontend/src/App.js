import React from 'react'
// CSS
import './App.css'

// All Components
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Privacy from './Components/Privacy/Privacy'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'

// Slicker Carousel
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

// Import React Router Dom
import {
  BrowserRouter, Routes, Route
} from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/privacy" element={<Privacy />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

