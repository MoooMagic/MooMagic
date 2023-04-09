import React, { useState, useRef, useEffect } from 'react'
import './Product.css'

// Diary Icon
import diaryIcon from './dairyIcon.png'

// DilerBox for Profile
import SliderBoxProf from '../SliderBoxProf/SliderBoxProf'

// Rupee
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

// UseNavigate
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Product = (props) => {
    // Use Navigate
    const navigate = useNavigate();

    // Filter UseState
    const [filterVal, setfilterVal] = useState({
        milkVal: false,
        paneerVal: false,
        gheeVal: false,
        butterVal: false,
        dateVal: '',
        priceVal: 0,
    })

    // ProductList UseState
    const [productList, setProductList] = useState([]);

    // UseEffect for Load All Product
    useEffect(() => {
        props.loading.setLoading(true);
        if (props.AllProdList.length > 0) {
            setProductList(props.AllProdList);
            props.loading.setLoading(false);
        }
    }, [props.AllProdList])

    // Filter Change Handle
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        setfilterVal({
            ...filterVal,
            [name]: value,
        })
    }

    // UseEffect for Filter
    useEffect(() => {
        let filteredProducts = props.AllProdList.filter((elem) => {
            let isMilk = filterVal.milkVal === 'true' && elem.product_name.toLowerCase() === "milk";
            let isGhee = filterVal.gheeVal === 'true' && elem.product_name.toLowerCase() === "ghee";
            let isPaneer = filterVal.paneerVal === 'true' && elem.product_name.toLowerCase() === "paneer";
            let isButter = filterVal.butterVal === 'true' && elem.product_name.toLowerCase() === "butter";
            let isDate = elem.updatedAt.substring(0, 10) === filterVal.dateVal;
            let isPrice = elem.price <= parseInt(filterVal.priceVal)
            return isMilk || isGhee || isPaneer || isButter || isDate || isPrice;
        });

        if (filteredProducts.length > 0 || filterVal.milkVal === 'true' || filterVal.gheeVal === 'true' || filterVal.paneerVal === 'true' || filterVal.butterVal === 'true' || filterVal.dateVal !== '' || parseInt(filterVal.priceVal) !== 0) {
            setProductList(filteredProducts);
        } else {
            setProductList(props.AllProdList);
        }
    }, [filterVal, props.AllProdList])

    // UseEffect for Seacrh Data
    useEffect(() => {
        if (props.data !== '') {
            setProductList(props.AllProdList.filter((elem) => (
                elem.product_name.toLowerCase() === props.data.toLowerCase()
            )))
            props.setData('');
        }
    }, [props, props.data])

    // UseRef
    const ref = useRef([]);

    // Clear All The Filter
    const clearFilter = () => {
        for (let i = 0; i < ref.current.length; i++) {

            ref.current[i].checked = false;
        }
        setfilterVal({
            milkVal: false,
            paneerVal: false,
            gheeVal: false,
            butterVal: false,
            dateVal: '',
            priceVal: 0
        })

        setProductList(props.AllProdList);
    }

    return (
        <>
            <div className="productsPage">
                <SliderBoxProf />
                {/* Filter Part */}
                <div className="filterSide">
                    {/* Filter Heading */}
                    <div className="filterHeading">
                        <h4 style={{ color: 'blueviolet' }}>Filter By</h4>

                        {/* Clear All Button */}
                        <button className="filterClear" onClick={clearFilter}>
                            Clear All
                        </button>
                    </div>

                    <hr />

                    {/* Categories */}
                    <div className="filterCategories">
                        <h6>Categories</h6>
                        <p>
                            <img src={diaryIcon} alt="" />
                            Diary Products</p>

                        {/* Milk */}
                        <div className="filterCheck">
                            <input type="checkbox" name="milkVal" id="milkVal" className='check' onChange={handleFilterChange} value={filterVal.milkVal === 'true' ? false : true} ref={(element) => { ref.current[0] = element }} />
                            <label htmlFor="milkVal">Milk</label>
                        </div>

                        {/* Panner */}
                        <div className="filterCheck" >
                            <input type="checkbox" name="paneerVal" id="paneerVal" className='check' onChange={handleFilterChange} value={filterVal.paneerVal === 'true' ? false : true} ref={(element) => { ref.current[1] = element }} />
                            <label htmlFor="paneerVal">Paneer</label>
                        </div>
                        {/* Ghee */}
                        <div className="filterCheck">
                            <input type="checkbox" name="gheeVal" id="gheeVal" className='check' onChange={handleFilterChange} value={filterVal.gheeVal === 'true' ? false : true} ref={(element) => { ref.current[2] = element }} />
                            <label htmlFor="gheeVal">Ghee</label>
                        </div>
                        {/* Butter */}
                        <div className="filterCheck">
                            <input type="checkbox" name="butterVal" id="butterVal" className='check' onChange={handleFilterChange} value={filterVal.butterVal === 'true' ? false : true} ref={(element) => { ref.current[3] = element }} />
                            <label htmlFor="butterVal">Butter</label>
                        </div>
                    </div>

                    <hr />

                    {/* Filter By Date */}
                    <div className="filterDate">
                        <h6><div className="dot"></div>Date</h6>
                        <input type="date" name="dateVal" id="date" min="2023-01-01" max={new Date().getFullYear().toString() + "-12-31"} onChange={handleFilterChange} value={filterVal.dateVal} />
                    </div>

                    <hr />

                    {/* Filter By Price */}
                    <div className="filterPrice">
                        <h6>Price <button><CurrencyRupeeIcon /> 0 - {filterVal.priceVal}</button></h6>
                        {/* Range */}
                        <input
                            type="range"
                            name="priceVal"
                            id="price"
                            min="0"
                            max="1000"
                            className="slider"
                            onChange={handleFilterChange}
                            value={filterVal.priceVal}
                        />
                    </div>
                </div>

                {/* Product Part */}
                <div className="productSide">
                    <Loader loading={props.loading.loading} />
                    {productList.length !== 0 ?
                        productList.map((elem, index) =>
                            // Product Head
                            <div className="card" style={{ width: '17rem' }} key={index}>
                                {/* Product Img */}
                                <img src={elem.product_img} alt="" className='card-img-top' />
                                {/* Product Body */}
                                <div className="card-body">
                                    {/* Product Name */}
                                    <h5 className="card-title">{elem.product_name}</h5>
                                    {/* Product Tetx */}
                                    <p className="card-text">{elem.product_desc}</p>
                                    {/* In Stock */}
                                    <button className='stock' style={{ backgroundColor: elem.InStock ? 'dodgerblue' : 'rgb(255, 70, 45)' }}>{elem.InStock ? 'In Stock' : 'Out of Stock'}</button>
                                    {/* Price */}
                                    <div className="price">
                                        <p style={{ marginBottom: '0px' }}><strong><CurrencyRupeeIcon />{elem.price}</strong></p>
                                        <p className="fadePrice" style={{ marginBottom: '0px' }}>
                                            {elem.quantity}
                                        </p>
                                    </div>
                                </div>
                                <Link to={`/products/${elem._id.toString()}`} className="btn btn-outline-info my-2">View</Link>
                            </div>
                        ) :
                        <div className="text-center container">
                            <h4>No Results Found (`~`)</h4>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Product
