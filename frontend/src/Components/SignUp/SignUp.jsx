import React from "react";
import "./SignUp.css";

import { useNavigate } from "react-router-dom";
import seller from './Assets/seller.jpg'
import retailer from './Assets/retailer.jpg'

const SignUp = () => {
  const navigate=useNavigate();

  return (
    <>
      <div className="signUpMain">
        <div className="container">
          <div class="card" style={{ width: "18rem",height:"350px" }}>
            <img class="card-img-top" src={seller} alt="Card-img" />
            <div class="card-body">
              <h5 class="card-title text-center" style={{cursor:'pointer'}} onClick={()=>{navigate('/signup-seller')}}>Sign Up as Seller</h5>
            </div>
          </div>
          <div class="card" style={{ width: "18rem",height:"350px" }}>
            <img class="card-img-top" src={retailer} alt="Card-img" />
            <div class="card-body">
              <h5 class="card-title text-center" style={{cursor:'pointer'}} onClick={()=>{navigate('/signup-retailer')}}>Sign Up as Retailer</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
