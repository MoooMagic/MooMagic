import React, { useState, useEffect } from "react";
import "./UserProduct.css";

import { useNavigate } from "react-router-dom";

// Rupee
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const UserProduct = () => {
  const navigate = useNavigate();
  
  const [showUserProd, setshowUserProd] = useState([]);

  useEffect(() => {
    const loadUserProduct = async () => {
      // axios.get('/api/').then(res=>{

      // })
      setshowUserProd([
        {
          id: 0,
          product_img:
            "https://patankarfarmproducts.com/wp-content/uploads/2020/08/500-ml-ghee.jpg",
          product_name: "Ghee",
          product_desc: "Masti Masti",
          price: 550,
          quantity: "50L",
          InStock: true,
          updatedAt: "2023-03-18T20:32:07.039+00:00",
          store: 1,
        },
        {
          id: 1,
          product_img:
            "https://rukminim1.flixcart.com/image/416/416/l16rde80/milk/s/u/v/1-taaza-homogenised-toned-milk-1-l-tetra-pak-box-toned-amul-original-imagcsyy9spcwwgp.jpeg?q=70",
          product_name: "Milky Mist Toned Milk (UHT)",
          product_desc:
            "Masti Masti Masti Masti Masti MastiMasti MastiMasti MastiMasti MastiMasti",
          price: 550,
          quantity: "50L",
          InStock: true,
          updatedAt: "2023-03-18T20:32:07.039+00:00",
          store: 1,
        },
      ]);
    };
    loadUserProduct();
  }, []);

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
