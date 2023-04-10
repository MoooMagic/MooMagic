import React, { useState, useEffect } from 'react'
import './ProductPage.css'
// Axios
import axios from 'axios'

// Use Params for ID
import { useParams } from 'react-router-dom';

// Buy Now Icon
import FlashOnIcon from '@mui/icons-material/FlashOn';
// Cart Icon
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// Rupee
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// Date
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// Money Icon
import MoneyIcon from '@mui/icons-material/Money';
// Card
import CreditCardIcon from '@mui/icons-material/CreditCard';
// Return
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
// Sell
import StorefrontIcon from '@mui/icons-material/Storefront';
// SweetAlert
import Swal from 'sweetalert2'
// UseNavigate
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

const ProductPage = (props) => {
    // UseNavigate
    const navigate = useNavigate();

    // Get ID from Route Params
    const { id } = useParams()

    // Use State for Per Product
    const [singleProduct, setsingleProduct] = useState(null)

    // Use Effect For Find Perticular Product
    useEffect(() => {
        props.loading.setLoading(true);
        axios.get(`http://localhost:5000/api/product/productid/${id}`)
            .then(res => {
                setsingleProduct(res.data)
                props.loading.setLoading(false);
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [id])

    // Add to Cart Func
    const addToCart = () => {
        const token = localStorage.getItem('token')
        const userid = localStorage.getItem('userid')
        if (!token & !userid) {
            window.location.href = '/signin'
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login First!',
            })
            navigate('/login')
        } else {
            axios.post('http://localhost:5000/api/cart/addcart', {
                products: [{
                    product_id: id,
                    product_name: singleProduct.product_name || '',
                    product_desc: singleProduct.product_desc || '',
                    product_img: singleProduct.product_img || '',
                    quantity: 1,
                    price: singleProduct.price
                }]
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart',
                    text: 'Product Added to Cart Successfully',
                })
            }).catch(err => {
                console.log(err)
            })

        }
    }

    return (
        <>
            <div className="productPagePer">
                <Loader loading={props.loading.loading} />
                {
                    singleProduct && (
                        <div className="container">
                            <div className="row">
                                {/* Left Product Image Logo */}
                                <div className="col-md-4">
                                    <div className="imgPro">
                                        <img src={singleProduct.product_img} alt="" />
                                    </div>

                                    <div className="buttonPro">
                                        {
                                            singleProduct.createdBy === localStorage.getItem("userid") ? <></> : <button className='btn btn-outline-primary'> <FlashOnIcon /> Buy Now</button>
                                        }
                                        {
                                            singleProduct.createdBy === localStorage.getItem("userid") ? <></> : <button className='btn btn-success' onClick={addToCart}><ShoppingCartIcon /> Add to Cart</button>
                                        }

                                    </div>
                                </div>
                                {/* Right Product Image Details */}
                                <div className="col-md-6">
                                    {/* Product Name */}
                                    <h3>{singleProduct.product_name}</h3>
                                    {/* Product Desc */}
                                    <h6>{singleProduct.product_desc}</h6>
                                    {/* Per Price */}
                                    <div className="perPrice">
                                        <CurrencyRupeeIcon /> {singleProduct.price}
                                    </div>
                                    {/* Manufacture Date */}
                                    <p><CalendarMonthIcon /> Manufacture Date : </p>
                                    {/* Expire Date */}
                                    <p><CalendarMonthIcon /> Expire Date : </p>
                                    {/* Quantity */}
                                    <p>Quantity  <button className='perQuan'>{singleProduct.quantity}</button></p>
                                    {/* Services */}
                                    <p>
                                        Services
                                        <div className="delServ">
                                            <p><MoneyIcon /> Cash On Delivery</p>
                                            <p><CreditCardIcon /> By Card</p>
                                            <p><AssignmentReturnIcon /> Return Policy Available</p>
                                        </div>
                                    </p>

                                    {/* In Stock */}
                                    <button className='stock' style={{ backgroundColor: singleProduct.InStock ? 'dodgerblue' : 'rgb(255, 70, 45)' }}>{singleProduct.InStock ? 'Available' : 'Not Available'}</button>

                                    {/* Seller Details */}
                                    <p>
                                        <StorefrontIcon /> Seller : Super Com Net
                                    </p>

                                    <div className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th className='text-center'>Specifications</th>
                                            </tr>

                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td>
                                                    Brand
                                                </td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Flavor
                                                </td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Type
                                                </td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Quantity
                                                </td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Container Type
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
            </div>
        </>
    )
}

export default ProductPage
