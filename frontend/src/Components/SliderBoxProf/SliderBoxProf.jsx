import React, { useState } from 'react'
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

const SliderBoxProf = () => {
    // Slider width
    const [slideWidth, setSlideWidth] = useState(false);

    return (
        <>
            {/* Slide Box */}
            {localStorage.getItem('token') !== null ?
                <>
                    <div className="slideBoxProfile" style={{ display: slideWidth ? 'flex' : 'none' }}>
                        {/* Name Profile */}
                        <img src={profileLogo} alt="" />
                        <h5>Hey, FirstName</h5>

                        {/* Divider */}
                        <div className="hr"></div>

                        {/* All Items */}
                        <span className="profile-Item"><AccountCircleIcon className='prof' />Your Profile</span>
                        <span className="profile-Item"><Inventory2Icon className='prof' />Your Products</span>
                        <span className="profile-Item"><ViewListIcon className='prof' />Your Orders</span>
                        <span className="profile-Item"><ShoppingCartIcon className='prof' />Cart</span>

                        {/* Logout When User is Logged In */}
                        <span className="profile-Item"><LogoutIcon className='prof' />Logout</span>
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
