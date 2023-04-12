import React, { useEffect, useState } from 'react'
// Logo
import Logo1 from './logo1.png'
// Profile Logo
import profileLogo from './profileLogo.jpg'
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
// DropDown Icon
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// PersonIcon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// Product Icon
import Inventory2Icon from '@mui/icons-material/Inventory2';
// Order Icon
import ViewListIcon from '@mui/icons-material/ViewList';
// Cart
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// LogOut
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';


const Navbar = (props) => {
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
    const [username, setusername] = useState([]);
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
        if (searchData.data !== "" && searchData.data !== null && searchData.data.trim(" ")) {
            props.setData(searchData.data)
            setsearchData({
                data: ""
            })
            navigate("/products")
        }
    }

    const handleSearchKeyPress = (e) => {
        console.log("Hello")
        if (e.key === "Enter") {
            searchBarData();
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('userid');
        //const userid=user.replace(/['"]+/g, '');
        if (token && user) {
            axios.get(`http://localhost:5000/api/auth/user/${user}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                const fullname = res.data.name;
                const name = fullname.split(" ")[0];
                setusername(name);
            })
                .catch((err) => { console.log(err) })
        }

    }, [])

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
                            <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={searchBarData} onKeyPress={handleSearchKeyPress} />
                        </div>
                    </div>

                    {/* Nav Button */}
                    <div className="nav-right">

                        {localStorage.getItem('token') !== null ?
                            <>
                                {/* If User is Logged In Show the User First Name  */}
                                <div className="sec-center">
                                    {/* Dropdown Element Checkbox */}
                                    <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />

                                    {/* User First Name Show */}
                                    <label className="for-dropdown" htmlFor="dropdown"
                                    >
                                        {/* User Profile Pic */}
                                        <img
                                            src={profileLogo}
                                            alt="User Profile Pic"
                                            className="profile"
                                        />
                                        <h6>Hey, {username}</h6>
                                        {/* Icon For Dropdown */}
                                        <ArrowDropDownIcon className="uil" />
                                    </label>

                                    {/* Dropdown bar */}
                                    <div className="section-dropdown">
                                        {/* Items */}
                                        <span className="dropdown-item" onClick={() => { navigate('/profile') }}><AccountCircleIcon className='prof' />Your Profile</span>

                                        <span className="dropdown-item" onClick={() => { navigate('/user-product') }}><Inventory2Icon className='prof' />Your Products</span>


                                        <span className="dropdown-item" onClick={() => navigate('/cart')}><ShoppingCartIcon className='prof' />Cart</span>

                                        {/* Logout When User is Logged In */}
                                        <span className="dropdown-item" onClick={() => {
                                            localStorage.clear()
                                            navigate('/signin')
                                        }}><LogoutIcon className='prof' />Logout</span>
                                    </div>
                                </div>
                            </> : <>

                                {/* SignUp */}

                                <button className="nav-btn" onClick={() => { navigate("/signup") }}>SIGN UP</button>

                                {/* SignIn */}

                                <button className="nav-btn" onClick={() => { navigate("/signin") }}>SIGN IN</button>
                            </>
                        }
                    </div>
                </div >
            </nav >
        </>
    )
}

export default Navbar