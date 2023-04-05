import { React, useState, useEffect } from 'react'
import './EditProfile.css'

// Email Icon
import EmailIcon from '@mui/icons-material/Email';
// Contact
import ContactsIcon from '@mui/icons-material/Contacts';
// Profile Icon
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
    const [userdata, setuserdata] = useState('');
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userid");

        if (!token && !user) {
            return window.location.href = "/signin";
        }
        else {
            axios.get(`http://localhost:5000/api/auth/user/${user}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                setuserdata(res.data)
            }).catch((err) => {
                console.log(err);
            })
        }

    }, []);

    function validateMobileNumber(mobileNumber) {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobileNumber);
    }

    const [error, setError] = useState("");

    const handelchange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        let errorMessage = "";
        if (name === "email") {
            // check if email is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = "Please enter a valid email address";
            }
        } else if (name === "phonenumber") {
            // check if mobile number is valid
            if (!validateMobileNumber(value)) {
                errorMessage = "Please enter a valid mobile number";
            }
        }

        setuserdata({ ...userdata, [name]: value })

        setError(errorMessage);

    }
    const navigate = useNavigate();
    const handelsubmit = async (e) => {
        if (error !== "" || userdata.name === "") {
            alert("Invalid Input");
        } else {
            const token = localStorage.getItem("token");
            const userid = localStorage.getItem("userid");
            if (!token && !userid) {
                return window.location.href = "/signin";
            }
            e.preventDefault();
            axios.put(`http://localhost:5000/api/auth/${userid}`, userdata, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                window.location.href = "/profile";
                console.log(res);
            }
            ).catch((err) => {
                console.log(err);
            })
        }
    }
    return (
        <>
            <div className="edProf">
                <label htmlFor="name"><PersonIcon style={{ marginRight: '5px' }} />Name</label>
                {
                    userdata !== '' && <input type="text" id='name' name='name' value={userdata.name} onChange={handelchange} />
                }

                <label htmlFor="email"><EmailIcon style={{ marginRight: '5px' }} />Email</label>

                {
                    userdata !== '' && <input type="email" name='email' id='email' value={userdata.email} onChange={handelchange} />
                }

                <label htmlFor="name"><ContactsIcon style={{ marginRight: '5px' }} />Contact</label>

                {
                    userdata !== '' && <input type="text" name='phonenumber' id='contact' value={userdata.phonenumber} onChange={handelchange} />
                }

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <button className="btn btn-outline-success" onClick={handelsubmit}>Save</button>
            </div>
        </>
    )
}

export default EditProfile
