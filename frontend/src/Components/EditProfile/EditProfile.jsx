import React from 'react'
import './EditProfile.css'

// Email Icon
import EmailIcon from '@mui/icons-material/Email';
// Contact
import ContactsIcon from '@mui/icons-material/Contacts';
// Profile Icon
import PersonIcon from '@mui/icons-material/Person';

const EditProfile = () => {
    return (
        <>
            <div className="edProf">
                <label htmlFor="name"><PersonIcon style={{ marginRight: '5px' }} />Name</label>
                <input type="text" id='name' name='name' />

                <label htmlFor="email"><EmailIcon style={{ marginRight: '5px' }} />Email</label>
                <input type="email" name='email' id='email' />

                <label htmlFor="name"><ContactsIcon style={{ marginRight: '5px' }} />Contact</label>
                <input type="text" name='contact' id='contact' />

                <button className="btn btn-outline-success">Save</button>
            </div>
        </>
    )
}

export default EditProfile
