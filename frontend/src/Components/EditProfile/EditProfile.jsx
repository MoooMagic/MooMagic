import {React,useState} from 'react'
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
    const [userdata,setuserdata]=useState({
        name:'',
        email:'',
        phonenumber:''
    })
    const handelchange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setuserdata({...userdata,[name]:value})
    }
    const navigate=useNavigate();
    const handelsubmit=async(e)=>{
        const token=localStorage.getItem("token");
        const userid=localStorage.getItem("userid");
        if(!token&& !userid){
            return window.location.href="/signin";
        }
        e.preventDefault();
        axios.put(`http://localhost:5000/api/auth/${userid}`,userdata,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then((res)=>{
            window.location.href="/profile";
            console.log(res);
        }
        ).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <>
            <div className="edProf">
                <label htmlFor="name"><PersonIcon style={{ marginRight: '5px' }} />Name</label>
                <input type="text" id='name' name='name' value={userdata.name} onChange={handelchange} />

                <label htmlFor="email"><EmailIcon style={{ marginRight: '5px' }} />Email</label>
                <input type="email" name='email' id='email' value={userdata.email} onChange={handelchange}/>

                <label htmlFor="name"><ContactsIcon style={{ marginRight: '5px' }} />Contact</label>
                <input type="text" name='phonenumber' id='contact' value={userdata.phonenumber} onChange={handelchange}/>

                <button className="btn btn-outline-success" onClick={handelsubmit}>Save</button>
            </div>
        </>
    )
}

export default EditProfile
