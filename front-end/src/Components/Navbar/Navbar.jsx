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
// HamburgerEnd
import { GiHamburgerMenu } from 'react-icons/gi'
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

    const navigate = useNavigate()

    const [showMenu, setshowMenu] = useState(false);

    const [searchData, setsearchData] = useState({
        data: ""
    })

    const handleSearch = (e) => {
        const { name, value } = e.target

        setsearchData({
            ...searchData,
            [name]: value
        })
    }

    const searchBarData = () => {
        console.log(searchData.data);
        setsearchData({
            data: ""
        })
    }

    return (
        <>
            {/* <!-- Navbar With Dropdown --> */}
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    {/* <!-- Logo --> */}
                    <NavLink className="navbar-brand" to="/"> <img src={Logo1} alt="" className="nav-logo" />
                    </NavLink>

                    <div className='nav-logo-text'>
                        <p onClick={() => (navigate("/"))}>
                            Moo Magic
                        </p>
                    </div>

                    {/* <!-- Collapsiable --> */}
                    <div
                        className="navbar-toggler"

                        data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavbar"
                        aria-expanded={showMenu}
                        onClick={() => {
                            showMenu ? setshowMenu(false) : setshowMenu(true)
                        }}
                    >
                        <GiHamburgerMenu />
                    </div>

                    {/* Nav Item */}
                    <div className={showMenu ? "collapse navbar-collapse show" : "collapse navbar-collapse"}>
                        <ul className="navbar-nav">
                            <NavLink className="nav-item" style={navLinkActiveStyle} to="/">Home
                                <div className="under"></div></NavLink>
                            <NavLink className="nav-item" style={navLinkActiveStyle} to="/about">About
                                <div className="under"></div></NavLink>
                            <NavLink className="nav-item" style={navLinkActiveStyle} to="/contact">Contact
                                <div className="under"></div></NavLink>
                            <NavLink className="nav-item" style={navLinkActiveStyle} to="/privacy">Privacy
                                <div className="under"></div></NavLink>

                            {/* Search Bar */}
                            <div className="search-nav">
                                <input type="text" name="data" id="" placeholder='Search' value={searchData.data} onChange={handleSearch} />
                                <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={searchBarData} />
                            </div>
                        </ul>
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
