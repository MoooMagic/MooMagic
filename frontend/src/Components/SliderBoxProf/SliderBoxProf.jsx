import React, { useState,useEffect } from 'react'
// CSS
import './SliderBoxProf.css'

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
// Double Arrow For Slider
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// Close
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// Profile Logo
import profileLogo from './profileLogo.jpg'

// UseNavigate
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

const SliderBoxProf = () => {
    const navigate=useNavigate();

    // Slider width
    const [slideWidth, setSlideWidth] = useState(false);

    const [username, setusername] = useState([]);

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
            {/* Slide Box */}
            {localStorage.getItem('token') !== null ?
                <>
                    <div className="slideBoxProfile" style={{ display: slideWidth ? 'flex' : 'none' }}>
                        {/* Name Profile */}
                        <img src={profileLogo} alt="" />
                        <h5>Hey, {username}</h5>

                        {/* Divider */}
                        <div className="hr"></div>

                        {/* All Items */}
                        <span className="profile-Item" onClick={() => { navigate('/profile') }}><AccountCircleIcon className='prof' />Your Profile</span>
                        <span className="profile-Item" onClick={() => { navigate('/user-product') }}><Inventory2Icon className='prof' />Your Products</span>
                        <span className="profile-Item" ><ViewListIcon className='prof' />Your Orders</span>
                        <span className="profile-Item" onClick={() => navigate('/cart')}><ShoppingCartIcon className='prof' />Cart</span>

                        {/* Logout When User is Logged In */}
                        <span className="profile-Item" onClick={() => {
                                            localStorage.clear()
                                            navigate('/signin')
                                        }}><LogoutIcon className='prof' />Logout</span>
                        {/* CloseIcon                                 */}
                        <HighlightOffIcon className='closeProf' onClick={() => setSlideWidth(false)} />

                    </div>
                    <button className='pull' onClick={() => setSlideWidth(true)}><DoubleArrowIcon /></button>
                </> : <>

                </>
            }
        </>
    )
}

export default SliderBoxProf
