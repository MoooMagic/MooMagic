/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
// CSS
import './Footer.css'
// Social Icons
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <div className="footer">
        {/* Inner Footer Box */}
        <div className="footerBox">
          {/* Footer Contact */}
          <div className="contactBox">
            <p>Contact</p>
            <p>Shahbaz Hussain</p>
            <p>Souptik Sarkar</p>
            <p>Bipasha Paul</p>
            <p>Shilajit Acharjee</p>
            <p>Debarghya Mondal</p>
            <p>Anirban Samanta</p>
          </div>
          <div className="contactBox">
            <p>About</p>
            <p>Mission</p>
            <p>Vision</p>
            <p>Get in Touch</p>
            <p>Career</p>
            <p>Products</p>
            <p>FAQs</p>
          </div>
          <div className="contactBox">
            <p>Support</p>
            <p>Support Request</p>
            <p>Toll Free</p>
            <p>Contact Us</p>
          </div>
          {/* Map */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.539614590848!2d88.34291951443245!3d22.483928641886937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0270ecc09b4691%3A0x7f99d48523fd066a!2sCalcutta%20Institute%20of%20Engineering%20And%20Management%20(CIEM)!5e0!3m2!1sen!2sin!4v1678359712793!5m2!1sen!2sin" width="400" height="250" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='footerMap' />
        </div>
        <div className="footerBox">
          <div className="contactBox">
            <p style={{ fontSize: "0.9rem" }}>&copy; Copyright 2023 Moo Magic-All Rights Reserved 2023</p>
            <p style={{ fontSize: "0.9rem" }}>Privacy Policy - Terms & Conditions</p>
          </div>
          <div className="footerSocial">
            <SocialIcon network='facebook' className='footerIcon' />
            <SocialIcon network='twitter' className='footerIcon' />
            <SocialIcon network='instagram' className='footerIcon' />
            <SocialIcon network='linkedin' className='footerIcon' />
            <SocialIcon network='youtube' className='footerIcon' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
