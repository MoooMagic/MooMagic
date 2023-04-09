/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./SignUp.css";

import { useNavigate } from "react-router-dom";
import seller from './Assets/seller.jpg'
import retailer from './Assets/retailer.jpg'

import StorefrontIcon from '@mui/icons-material/Storefront';

const SignUp = () => {
  const navigate=useNavigate();

  return (
    <>
      <div className="signUpMain">
          <div className="card" style={{ width: "18rem",height:"350px" }} onClick={()=>{navigate('/signup-seller')}}>
            <img className="card-img-top" src={seller} alt="Card image" />
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up as Seller</h5>
              <StorefrontIcon style={{marginTop:'10px'}}/>
            </div>
          </div>
          <div className="card" style={{ width: "18rem",height:"350px" }} onClick={()=>{navigate('/signup-retailer')}}>
            <img className="card-img-top" src={retailer} alt="Card image" />
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up as Retailer</h5>
              <StorefrontIcon style={{marginTop:'10px'}}/>
            </div>
          </div>
      </div>
    </>
  );
};

export default SignUp;
