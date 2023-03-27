import React, { useState } from 'react'
import './Profile.css'

// NavLink
import { NavLink } from "react-router-dom"
// UseNavigate
import { useNavigate } from 'react-router-dom'
import EditProfile from '../EditProfile/EditProfile'

// Profile Icon
import PersonIcon from '@mui/icons-material/Person';
// Edit Icon
import EditIcon from '@mui/icons-material/Edit';
// Role Icon
import StorefrontIcon from '@mui/icons-material/Storefront';
// Email Icon
import EmailIcon from '@mui/icons-material/Email';
// Contact
import ContactsIcon from '@mui/icons-material/Contacts';
// Status Icon
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

// Profile Logo
import profileLogo from './profileLogo.jpg'

const Profile = () => {
    const [profVal, setProfVal] = useState({
        prof: true,
        editProf: false
    });

    // Active Style
    const navLinkActiveStyle = ({ isActive }) => {
        return {
            color: isActive ? 'rgb(173, 20, 220)' : '#000000',
            textDecoration: isActive ? 'underline' : 'none',
            textUnderlineOffset: isActive ? '6px' : '0px',
            textDecorationThickness: isActive ? '2px' : '0px',
            textShadow: isActive ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'none'
        }
    }

    return (
        <>
            <div className="dashboard">
                <div className="container">
                    <div className="profNav">
                        {/* Profile Nav */}
                        <NavLink className="nav-item" style={navLinkActiveStyle} to="/profile" onClick={() => setProfVal({
                            prof: true,
                            editProf: false
                        })}><PersonIcon />Profile
                        </NavLink>
                        {/* Edit Profile Nav */}
                        <NavLink className="nav-item" style={navLinkActiveStyle} to="/edit-profile" onClick={() => setProfVal({
                            prof: false,
                            editProf: true
                        })}><EditIcon />Edit Profile
                        </NavLink>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                            {/* Name Profile */}
                            <img src={profileLogo} alt="" />
                            <h5>Full Name</h5>

                            <h6>abcd@gmail.com</h6>
                        </div>
                        <div className="col-md-7 right">
                            {
                                profVal.prof ? <>
                                    <table className="table">
                                        <tbody>
                                            {/* Name */}
                                            <tr>
                                                <td><PersonIcon style={{ marginRight: '5px' }} />Name</td>
                                                <td>Full Name</td>
                                            </tr>
                                            {/* Role */}
                                            <tr>
                                                <td><StorefrontIcon style={{ marginRight: '5px' }} />Role</td>
                                                <td>Seller</td>
                                            </tr>
                                            {/* Email */}
                                            <tr>
                                                <td><EmailIcon style={{ marginRight: '5px' }} />Email</td>
                                                <td>abcd@gmail.com</td>
                                            </tr>
                                            {/* Contact */}
                                            <tr>
                                                <td><ContactsIcon style={{ marginRight: '5px' }} />Contact</td>
                                                <td>+91 1234567890</td>
                                            </tr>
                                            {/* Status */}
                                            <tr>
                                                <td><DonutLargeIcon style={{ marginRight: '5px' }} />Status</td>
                                                <td>Active</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </> :
                                    <EditProfile />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
