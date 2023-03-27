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

const Cart = () => {
    // Use State
    const [cartProd, setCartProd] = useState([]);

    useEffect(() => {
        const loadCartProduct = async () => {
            // axios.get('/api/').then(res=>{

            // })
            setCartProd([
                {
                    id: 0,
                    product_img: "https://patankarfarmproducts.com/wp-content/uploads/2020/08/500-ml-ghee.jpg",
                    product_name: "Ghee",
                    product_desc: "Masti Masti",
                    price: 550,
                    quantity: "50L",
                    InStock: true,
                    updatedAt: "2023-03-18T20:32:07.039+00:00",
                    store: 1
                },
                {
                    id: 1,
                    product_img: "https://rukminim1.flixcart.com/image/416/416/l16rde80/milk/s/u/v/1-taaza-homogenised-toned-milk-1-l-tetra-pak-box-toned-amul-original-imagcsyy9spcwwgp.jpeg?q=70",
                    product_name: "Milky Mist Toned Milk (UHT)",
                    product_desc: "Masti Masti Masti Masti Masti MastiMasti MastiMasti MastiMasti MastiMasti",
                    price: 550,
                    quantity: "50L",
                    InStock: true,
                    updatedAt: "2023-03-18T20:32:07.039+00:00",
                    store: 1
                }
            ])
        };
        loadCartProduct();
    }, [])


    const deleteCartProduct=(id)=>{

    }

    const deleteAllCartProduct=()=>{

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
                            <p style={{ fontSize: '1.2rem', width: '50px', textAlign: 'center', alignSelf: 'center' }}>{elem.store}</p>
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
                            <h6 style={{ padding: '5px 10px', backgroundColor: 'white', borderRadius: '5px', marginTop: '30px' }}>Total Price = <CurrencyRupeeIcon /> {elem.price * elem.store}</h6>
                        </div>
                    </div>
                )
                    : <>
                        <div className="text-center container">
                            <h4>No products have been added yet</h4>
                        </div></>}

            </div>
        </>
    )
}

export default Cart
