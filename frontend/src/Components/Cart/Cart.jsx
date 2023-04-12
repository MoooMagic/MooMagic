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
    const [user, setUser] = useState(null);

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
    useEffect(() => {
        const fetchUser = async () => {
            const userId=localStorage.getItem('userid')
            const token = localStorage.getItem('token')
          try {
            const res = await axios.get(`http://localhost:5000/api/auth/user/${userId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { name, email, phonenumber } = res.data;
            setUser({ name, email, phonenumber });
          } catch (error) {
            console.log(error);
          }
        };
        fetchUser();
      }, []);
    const createorder = () => {
        const products = JSON.stringify(cartProd)
        axios.post('http://localhost:5000/api/razorpay/createorder',{
            amount:totalprice.price,
            currency:'INR',
            receipt:'receipt#1',
            notes:{
                products:"Products"
            }
        }).then(res=>{
            handlePayment(res.data.data)
            const deleteorder = () => {
                const token = localStorage.getItem('token')
                axios.delete('http://localhost:5000/api/cart/removecart', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    setCartProd([])
                    setTotalprice(0)
                    window.href.location.reload()
                }).catch(err => { console.log(err) })
            }
            deleteorder()
                Swal.fire({
                icon: 'success',
                title: 'Order Created',
                text: 'Order Created Successfully',
            })
           
        }).catch(err=>{
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                description: 'Server Error',
            })})
    }

    const handlePayment = (data) => {
        const options = {
            key:process.env.KEY,
            amount:data.amount,
            currency:data.currency,
            order_id:data.id,
            name:'MooMagic',
            description:'TIndias Own Dairy Farm',
            image:'',
            
            handler:function(response){
                axios.post('http://localhost:5000/api/razorpay/verify',{
                    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature
                })
                .then(res=>{
                    if(res.data.status === '200'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Success',
                            text: 'Payment Successfull',
                        })}
                        else if(res.data.status === '400'){
                            Swal.fire({
                                icon: 'error',
                                title: 'Payment Failed',
                                text: 'Payment Failed',
                            })
                        }
                }).catch(err=>{
                    console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                })})
            },
            prefill:{
                name:user.name,
                email:user.email,
                contact:user.phonenumber
            },
            theme:{
                color:'#3399cc'
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <>
            <div className="cart">
                <div className="cartLeft">
                    {/* Cart Head */}
                    {cartProd.length !== 0 ? <div className="cartHead">
                        <button className='btn btn-info' onClick={createorder}>Place Order</button>
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
                            </div>
                            {/* Product Value Increase */}
                            <div className="cartProductDetails">
                                {/* Product Description */}
                                <h4>{elem.product_name}</h4>
                                <p className='cartDesc'>{elem.product_desc}</p>
                                <p className='cartQuan'>{elem.quantity}</p>
                                <p className='cartStock' style={{ backgroundColor: elem.InStock ? 'dodgerblue' : 'rgb(255, 70, 45)' }}>{elem.InStock ? 'In Stock' : 'In Stock'}</p>

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
