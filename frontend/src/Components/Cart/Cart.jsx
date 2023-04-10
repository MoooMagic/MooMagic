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
import ShieldIcon from '@mui/icons-material/Shield';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Cart = (props) => {
    const navigate = useNavigate();

    // Use State
    const [cartProd, setCartProd] = useState([]);
    const [totalprice, setTotalprice] = useState({
        count: 0,
        price: 0
    });

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            window.location.href = '/signin'
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login First!',
            })
            navigate('/login')
        } else {
            props.loading.setLoading(true);
            axios.get('http://localhost:5000/api/cart/getcart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setCartProd(res.data.products);
                props.loading.setLoading(false);
            }).catch(err => { console.log(err) })
        }
    }, [])

    useEffect(() => {
        if (cartProd.length > 0) {
            const token = localStorage.getItem('token')
            if (token) {
                axios.get('http://localhost:5000/api/cart/getcart', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    setTotalprice({
                        count: cartProd.length,
                        price: res.data.totalprice
                    })
                }).catch(err => { console.log(err) })
            }
        }
    }, [cartProd.length])

    const deleteCartProduct = (id) => {

    }

    const deleteAllCartProduct = () => {
        const token = localStorage.getItem('token')
        axios.delete('http://localhost:5000/api/cart/removecart', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setCartProd([])
            setTotalprice(0)
            Swal.fire({
                icon: 'success',
                title: 'Cart Cleared',
                text: 'Cart Cleared Successfully',
            })
            window.href.location.reload()
        }).catch(err => { console.log(err) })
    }

    return (
        <>
            <div className="cart">
                <Loader loading={props.loading.loading} />
                <div className="cartLeft">
                    {/* Cart Head */}
                    {cartProd.length !== 0 ? <div className="cartHead">
                        <button className='btn btn-info'>Place Order</button>
                        <button onClick={deleteAllCartProduct} className='btn btn-outline-danger'>Remove All</button>
                    </div> : <></>}

                    {/* Cart Body */}
                    {cartProd.length !== 0 ? cartProd.map((elem, index) =>
                        <div className="cartBody" key={index}>
                            {/* Cart Product Img*/}
                            <div className="cartProductImg">
                                {/* Product Image */}
                                <img src={elem.product_img} alt="" />
                                {/* Delete Product */}
                                <DeleteIcon style={{ color: 'red', cursor: 'pointer', marginTop: '30px' }} onClick={deleteCartProduct(elem.id)} />
                            </div>
                            {/* Product Value Increase */}
                            <div className="cartProductDetails">
                                {/* Product Description */}
                                <h4>{elem.product_name}</h4>
                                <p className='cartDesc'>{elem.product_desc}</p>
                                <p className='cartQuan'>{elem.quantity}</p>
                                <p className='cartStock' style={{ backgroundColor: elem.InStock ? 'dodgerblue' : 'rgb(255, 70, 45)' }}>{elem.InStock ? 'In Stock' : 'Out of Stock'}</p>

                                {/* Rupee */}
                                <h5>
                                    <CurrencyRupeeIcon /> {elem.price}</h5>

                                <div className="cartVal">

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
                            </div>
                        </div>
                    )
                        : <>
                            <div className="text-center container">
                                <h4>No products have been added yet (`~`)</h4>
                            </div></>}
                </div>

                {/* Cart Total Price */}
                {cartProd.length !== 0 ?
                    <div className="cartRight">
                        <h4>PRICE DETAILS</h4>
                        <div className="hr"></div>
                        <div className="TotalPrice">
                            <h6>Price ({totalprice.count} items)</h6>
                            <h6><CurrencyRupeeIcon style={{ fontSize: '18px' }} />{totalprice.price}</h6>
                        </div>
                        <div className="TotalPrice">
                            <h6>Delivery Charges</h6>
                            <h6 style={{ color: 'green' }}>Free</h6>
                        </div>
                        <div className="hr"></div>
                        <div className="TotalPrice">
                            <h5>Total Amount</h5>
                            <h5><CurrencyRupeeIcon style={{ fontSize: '20px' }} />{totalprice.price}</h5>
                        </div>
                        <div className="hr"></div>
                        <h6 className='shield'>
                            <ShieldIcon /> Safe and Secure Payments.
                        </h6>
                    </div> : <></>}
            </div>
        </>
    )
}

export default Cart
