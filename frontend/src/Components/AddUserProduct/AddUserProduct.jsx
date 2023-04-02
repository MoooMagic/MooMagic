import React,{useState} from "react";
import "./AddUserProduct.css";
import axios from "axios";

// Sweetalert
import Swal from "sweetalert2";

const AddUserProduct = () => {
  const[addProduct, setAddProduct] = useState({
    product_img: "",
    product_name: "",
    product_desc: "",
    price: 0,
    quantity: "",
    InStock: true,
  });

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;

    setAddProduct({
      ...addProduct,
      [name]: value,
    });
  };
  const token=localStorage.getItem('token');
  console.log(token);
  const uploadProduct = () => {
    axios.post('http://localhost:5000/api/product/addproduct', addProduct,{
      headers: {
        'Authorization': `Bearer ${token}`,}
    }).then((res) => {
      console.log(res);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product Added Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch((err) => {
      console.log(err);
    });
    setAddProduct({product_img: "",
    product_name: "",
    product_desc: "",
    price: 0,
    quantity: "",
    InStock: true,})
  };

  return (
    <>
      <div className="AddUserProduct">
        <div className="container">
          <h3 className="text-center">Add Your Own Product</h3>
          <label htmlFor="product_img">Enter Product Img URL</label>
          <input
            type="text"
            id="product_img"
            name="product_img"
            value={addProduct.product_img}
            onChange={handleChangeProduct}
          />

          <label htmlFor="product_name">Enter Product Name</label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            value={addProduct.product_name}
            onChange={handleChangeProduct}
          />

          <label htmlFor="product_desc">Enter Product Description</label>
          <input
            type="text"
            name="product_desc"
            id="product_desc"
            value={addProduct.product_desc}
            onChange={handleChangeProduct}
          />

          <label htmlFor="price">Enter Product Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={addProduct.price}
            onChange={handleChangeProduct}
          />

          <label htmlFor="quantity">Enter Product Quantity</label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            value={addProduct.quantity}
            onChange={handleChangeProduct}
          />

          <label htmlFor="InStock">Available or Not</label>

          <select onChange={handleChangeProduct} name="InStock" id="InStock">
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>

          <button className="btn btn-success" onClick={uploadProduct}>
            ADD
          </button>
        </div>
      </div>
    </>
  );
};

export default AddUserProduct;
