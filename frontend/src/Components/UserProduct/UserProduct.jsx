import React, { useState, useEffect } from "react";
import "./UserProduct.css";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

// Rupee
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// Edit Icon
import EditIcon from '@mui/icons-material/Edit';
// Delete Icon
import DeleteIcon from '@mui/icons-material/Delete';

import axios from "axios";
import Loader from "../Loader/Loader"

const UserProduct = (props) => {
  const navigate = useNavigate();

  const [showUserProd, setshowUserProd] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    if (!token && !userid) {
      return window.location.href = "/signin";
    }
    else {
      props.loading.setLoading(true);
      axios.get(`http://localhost:5000/api/product/productbyuser/${userid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        setshowUserProd(res.data);
        props.loading.setLoading(false);
      }).catch((err) => {
        console.log(err);
      })
    }

  }, [])

  const deletePerProduct = () => {

  }

  const editPerProduct = () => {

  }

  return (
    <>
      <div className="userProduct">
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            navigate("/add-product")
          }}
        >
          Add Product
        </button>

        <div className="userProductSide">
        <Loader loading={props.loading.loading} />
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
                    <p style={{ marginBottom: '0px' }}><strong><CurrencyRupeeIcon />{elem.price}</strong></p>
                    <p className="fadePrice" style={{ marginBottom: '0px' }}>
                      {elem.quantity}
                    </p>
                  </div>
                  <div className="lowerBtn">
                    <EditIcon style={{ color: 'blue' }} onClick={editPerProduct} />

                    <Link to={`/products/${elem._id}`} className="btn btn-outline-info my-2">View</Link>

                    <DeleteIcon style={{ color: 'red' }} onClick={deletePerProduct} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center container">
              <h4>No Product have been added (`~`)</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProduct;
