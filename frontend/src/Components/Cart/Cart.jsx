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
    // UseState
    // const [inc, setInc] = useState({
    //     incVal: 1,
    // });

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
                    product_name: "Milk",
                    product_desc: "Masti Masti",
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

        return (
        <>
            <div className="cart">
                {/* Cart Head */}
                <div className="cartHead">
                    <h4>Your Cart</h4>
                    <button className='btn btn-info'>Buy Now</button>
                    <p>Remove all</p>
                </div>
                {/* Cart Body */}
                {cartProd.length !== 0 ? cartProd.map((elem, index) =>
                    <div className="cartBody" key={index}>
                        {/* Cart Product */}
                        <div className="cartProduct">
                            {/* Product Image */}
                            <img src={elem.product_img} alt="" />
                            {/* Product Description */}
                            <div className="productDesc">
                                <h4>{elem.product_name}</h4>
                                <p className='cartDesc'>{elem.product_desc}</p>
                                <p className='cartQuan'>{elem.price}</p>
                                <p className='cartStock' style={{ backgroundColor: elem.InStock ? 'dodgerblue' : 'rgb(255, 70, 45)' }}>{elem.InStock ? 'In Stock' : 'Out of Stock'}</p>
                            </div>
                        </div>
                        {/* Product Value Increase */}
                        <div className="cartVal">
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
                        let newCartProd = [...cartProd];
                        newCartProd[index].store -= 1;
                        setCartProd(newCartProd);
                        }} />
                    </div>
                        {/* Product Price */}
                        <div className="cartPrice">
                            <h5 style={{ padding: '5px 10px', backgroundColor: 'white', borderRadius: '5px' }}>Price</h5>
                            {/* Rupee */}
                            <h5>
                                <CurrencyRupeeIcon /> {elem.price}</h5>
                            <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} />
                            {/* Total Price */}
                            <h6 style={{ padding: '5px 10px', backgroundColor: 'white', borderRadius: '5px', marginTop: '30px' }}>Total Price = <CurrencyRupeeIcon /> {250 * elem.store}</h6>
                        </div>
                    </div>
                )
                    : <>
                        <div className="text-center container">
                            <h4>No Results Found (`~`)</h4>
                        </div></>}

            </div>
        </>
    )
}

export default Cart
