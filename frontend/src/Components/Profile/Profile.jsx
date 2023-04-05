import React, { useEffect, useState } from 'react'
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
import axios from 'axios';

const Profile = () => {
    const [profVal, setProfVal] = useState({
        prof: true,
        editProf: false
    });
const [user, setUser] = useState('');
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
    useEffect(() => {
        const token=localStorage.getItem("token");
        const user=localStorage.getItem("userid");
        if(!token&& !user){
            return window.location.href="/signin";
        }
        axios.get(`http://localhost:5000/api/auth/user/${user}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then((res)=>{
            setUser(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }, []);

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
                            <h5>{user.name}</h5>

                            <h6>{user.email}</h6>
                        </div>
                        <div className="col-md-7 right">
                            {
                                profVal.prof ? <>
                                    <table className="table">
                                        <tbody>
                                            {/* Name */}
                                            <tr>
                                                <td><PersonIcon style={{ marginRight: '5px' }} />Name</td>
                                                <td>{user.name}</td>
                                            </tr>
                                            {/* Role */}
                                            <tr>
                                                <td><StorefrontIcon style={{ marginRight: '5px' }} />Role</td>
                                                <td>{user.isSeller?'Seller':'Retailer'}</td>
                                            </tr>
                                            {/* Email */}
                                            <tr>
                                                <td><EmailIcon style={{ marginRight: '5px' }} />Email</td>
                                                <td>{user.email}</td>
                                            </tr>
                                            {/* Contact */}
                                            <tr>
                                                <td><ContactsIcon style={{ marginRight: '5px' }} />Contact</td>
                                                <td>+91 {user.phonenumber}</td>
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
