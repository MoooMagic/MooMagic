import React from 'react'
import ContactForm from './Form'
import './Contact.css'
import contactImg from './Assets/contact us.jpg'

const Contact = () => {
  return (
    <>
      <div className="contact1" id='contact'>
        <h2>Contact Us</h2>
        <p>Feel free to contact us for any queries or suggestions.</p>
      </div>
      <div className="form-container">
        <ContactForm />
        <div className="contact2">
          <img src={contactImg} alt="contact" />
        </div>
      </div>
    </>
  )
}

export default Contact
