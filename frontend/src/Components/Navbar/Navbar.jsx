/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
// Logo
import Logo1 from './logo1.png'
// CSS
import './Navbar.css'
// NavLink
import { NavLink } from "react-router-dom"
// UseNavigate
import { useNavigate } from 'react-router-dom'
// Fot Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Search Icon
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    // Active Style
    const navLinkActiveStyle = ({ isActive }) => {
        return {
            color: isActive ? '#5027c2' : '#000000',
            textDecoration: isActive ? 'underline' : 'none',
            textUnderlineOffset: isActive ? '6px' : '0px',
            textDecorationThickness: isActive ? '2px' : '0px',
            textShadow: isActive ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'none'
        }
    }

    // useNavigate
    const navigate = useNavigate()

    // Search Bar Data
    const [searchData, setsearchData] = useState({
        data: ""
    })

    // Handle Search Func
    const handleSearch = (e) => {
        const { name, value } = e.target

        setsearchData({
            ...searchData,
            [name]: value
        })
    }

    // Search Bar Data Func
    const searchBarData = () => {
        console.log(searchData.data);
        setsearchData({
            data: ""
        })
    }

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    {/* Logo */}
                    <NavLink className="navbar-brand" to="/"> <img src={Logo1} alt="" className="nav-logo" />
                    </NavLink>

                    <div className='nav-logo-text'>
                        <p onClick={() => (navigate("/"))}>
                            Moo Magic
                        </p>
                    </div>

                    {/* Collapsiable */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Nav Item */}
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav me-auto">
                            <NavLink className="nav-item" style={navLinkActiveStyle} to="/">Home
                                <div className="under"></div></NavLink>
                            <NavLink className="nav-item" style={navLinkActiveStyle} to="/about">About
                                <div className="under"></div></NavLink>
                            <NavLink className="nav-item" style={navLinkActiveStyle} to="/contact">Contact
                                <div className="under"></div></NavLink>
                            <NavLink className="nav-item" style={navLinkActiveStyle} to="/privacy">Privacy
                                <div className="under"></div></NavLink>
                        </ul>
                        {/* Search Bar */}
                        <div className="search-nav">
                            <input type="text" name="data" id="" placeholder='Search' value={searchData.data} onChange={handleSearch} />
                            <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={searchBarData} />
                        </div>
                    </div>

                    {/* Nav Button */}
                    <div className="nav-right">
                        {/* SignUp */}
                        <button className="nav-btn" onClick={() => { navigate("/signup") }}>SIGN UP</button>
                        {/* SignIn */}
                        <button className="nav-btn" onClick={() => { navigate("/signin") }}>SIGN IN</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
