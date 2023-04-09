import React, { useState, useEffect } from 'react'
import './Cart.css'

// Axios
import axios from 'axios'

// Add Icon
import AddCircleIcon from '@mui/icons-material/AddCircle';
// Remove Icon
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// Rupee Icon
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// Delete Icon
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const Cart = () => {
    // Use State
    const [cartProd, setCartProd] = useState([]);
    const [totalprice, setTotalprice] = useState(0);

    useEffect(() => {
        const token=localStorage.getItem('token')
        axios.get('http://localhost:5000/api/cart/getcart',{
            headers:{
                'Authorization':`Bearer ${token}`}
        }).then(res=>{
            setCartProd(res.data.products)
        }).catch(err=>{ console.log(err)})
    }, [])
useEffect(()=>{
    const token=localStorage.getItem('token')
        axios.get('http://localhost:5000/api/cart/getcart',{
            headers:{
                'Authorization':`Bearer ${token}`}
        }).then(res=>{
            setTotalprice(res.data.totalprice)
        }).catch(err=>{ console.log(err)})
    }, [])

    const deleteCartProduct=(id)=>{

    }

    const deleteAllCartProduct=()=>{
        const token=localStorage.getItem('token')
        axios.delete('http://localhost:5000/api/cart/removecart',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            setCartProd([])
            setTotalprice(0)
            Swal.fire({
                icon: 'success',
                title: 'Cart Cleared',
                text: 'Cart Cleared Successfully',
            })
            window.href.location.reload()
        }).catch(err=>{ console.log(err)})
    }

    return (
        <>
            <div className="cart">
                {/* Cart Head */}
                <div className="cartHead">
                    <h4>Your Cart</h4>
                    <button className='btn btn-info'>Buy Now</button>
                    <p onClick={deleteAllCartProduct}>Remove all</p>
                </div>
                {/* Cart Body */}
                {cartProd.length !== 0 ? cartProd.map((elem, index) =>
                    <div className="cartBody row" key={index}>
                        {/* Cart Product */}
                        <div className="cartProduct col-md-4">
                            {/* Product Image */}
                            <img src={elem.product_img} alt="" />
                            {/* Product Description */}
                            <div className="productDesc">
                                <h4>{elem.product_name}</h4>
                                <p className='cartDesc'>{elem.product_desc}</p>
                                <p className='cartQuan'>{elem.quantity}</p>
                                <p className='cartStock' style={{ backgroundColor: elem.InStock ? 'dodgerblue' : 'rgb(255, 70, 45)' }}>{elem.InStock ? 'In Stock' : 'Out of Stock'}</p>
                            </div>
                        </div>
                        {/* Product Value Increase */}
                        <div className="cartVal col-md-4">
                            {/* Increase */}
                            <AddCircleIcon style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => {
                                let newCartProd = [...cartProd];
                                newCartProd[index].store += 1;
                                setCartProd(newCartProd);
                            }} />
                            {/* Value */}
                            <p style={{ fontSize: '1.2rem', width: '50px', textAlign: 'center', alignSelf: 'center' }}>{elem.quantity}</p>
                            {/* Decrease */}
                            <RemoveCircleIcon style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => {
                                if (elem.store === 1) {

                                } else {
                                    let newCartProd = [...cartProd];
                                    newCartProd[index].store -= 1;
                                    setCartProd(newCartProd);
                                }
                            }} />
                        </div>
                        {/* Product Price */}
                        <div className="cartPrice col-md-4">
                            <h5 style={{ padding: '5px 10px', backgroundColor: 'white', borderRadius: '5px' }}>Price</h5>
                            {/* Rupee */}
                            <h5>
                                <CurrencyRupeeIcon /> {elem.price}</h5>
                            {/* Delete */}
                            <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={deleteCartProduct(elem.id)}/>
                            {/* Total Price */}
                        </div>
                    </div>
                )
                    : <>
                        <div className="text-center container">
                            <h4>No products have been added yet</h4>
                        </div></>}
                        <h6 style={{ padding: '5px 10px', backgroundColor: 'white', borderRadius: '5px', marginTop: '30px' }}>Total Price = <CurrencyRupeeIcon /> {totalprice}</h6>
            </div>
        </>
    )
}

export default Cart
