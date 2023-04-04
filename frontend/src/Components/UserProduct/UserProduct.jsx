import React, { useState, useEffect } from "react";
import "./UserProduct.css";

import { useNavigate } from "react-router-dom";

// Rupee
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";




const UserProduct = () => {
  const navigate = useNavigate();
  
  const [showUserProd, setshowUserProd] = useState([]);

  useEffect(() => {
    const token=localStorage.getItem("token");
    const userid=localStorage.getItem("userid");
    axios.get(`http://localhost:5000/api/product/productbyuser/${userid}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }).then((res)=>{
      setshowUserProd(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])
  return (
    <>
      <div className="userProduct">
        {showUserProd.length !== 0 ? (
          showUserProd.map((elem, index) => (
            <div className="card" style={{ width: "17rem" }} key={index}>
              {/* Product Img */}
              <img src={elem.product_img} alt="" className="card-img-top" />
              {/* Product Body */}
              <div className="card-body">
                {/* Product Name */}
                <h5 className="card-title">{elem.product_name}</h5>
                {/* Product Tetx */}
                <p className="card-text">{elem.product_desc}</p>
                {/* In Stock */}
                <button
                  className="stock"
                  style={{
                    backgroundColor: elem.InStock
                      ? "dodgerblue"
                      : "rgb(255, 70, 45)",
                  }}
                >
                  {elem.InStock ? "In Stock" : "Out of Stock"}
                </button>
                {/* Price */}
                <div className="price">
                  <p>
                    <strong>
                      <CurrencyRupeeIcon />
                      {elem.price}
                    </strong>
                  </p>
                  <p className="fadePrice">{elem.quantity}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center container">
            <h4>No Results Found (`~`)</h4>
          </div>
        )}
      </div>

      <button
        className="btn btn-outline-primary"
        onClick={() => {
          navigate("/add-product")
        }}
      >
        Add Product
      </button>
    </>
  );
};

export default UserProduct;
