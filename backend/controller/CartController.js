const { json } = require('express');
const express = require('express');
const verify = require('../middleware/verify');
const router = express.Router();
const Cart = require('../model/Cart');
const Product = require('../model/Product');


router.post('/addcart', verify, async (req, res) => {
    const user_id = req.user.id;
    const products = req.body.products;

    try {
        let cart = await Cart.findOne({ user_id });
        for (let i = 0; i < products.length; i++) {
            const productid = products[i].product_id;
            const quantity = products[i].quantity;
            const product = await Product.findById(productid);
            if (!product) {
                return res.status(400).send(("Product doesnot exists"))
            }
            const productname=product.product_name;
            const productdesc=product.product_desc;
            const productimg=product.product_img;
            const tprice = product.price * quantity;

            if (!cart) {
                cart = new Cart({
                    user_id,
                    products: [{ product_id: productid, product_name:productname, product_desc:productdesc, product_img:productimg, quantity: quantity, price: product.price }],
                    totalprice: tprice
                });
            } else {
                const exsistingitem = cart.products.findIndex(p => p.product_id.toString() === productid);
                if (exsistingitem !== -1) {
                    cart.products[exsistingitem].quantity += parseInt(quantity)
                } else {
                    cart.products.push({ product_id: productid, product_name:productname, product_desc:productdesc, product_img:productimg, quantity: quantity, price: product.price })
                }
                cart.totalprice += tprice;
            }
        }

        await cart.save();
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).send(`Internal Server Error${error}`)
    }

});

router.post('/updatecart', verify, async (req, res) => {
    const user_id = req.user.id;
    const products = req.body.products;
    try {
        const cart = await Cart.findOne({ user_id });
        if (!cart) {
            return res.status(400).send("Cart not found")
        }
        for (let i = 0; i < products.length; i++) {
            const productid = products[i].product_id;
            const quantity = products[i].quantity;
            const product = await Product.findById(productid);
            if (!product) {
                return res.status(400).send("Product Not Found")
            }
            const productname=product.product_name;
            const productimg=product.product_img;
            const tprice = product.price * quantity;
            const exsistingitem = cart.products.findIndex(p => p.product_id.toString() === productid);
            if (exsistingitem !== -1) {
                cart.products[exsistingitem].quantity = quantity
            } else {
                cart.products.push({ product_id: productid, product_name:productname,product_img:productimg, quantity: quantity, price: product.price })
            }
            cart.totalprice += tprice;
        }
        await cart.save()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).send(`Internal Server Error${error}`)
    }
});

router.get('/getcart', verify, async (req, res) => {
    const user_id = req.user.id;
    try {
        const cart = await Cart.findOne({ user_id });
        if (!cart) {
            return res.status(400).send("Cart not found")
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send(`Internal Server Error${error}`)
    }
});

router.delete('/removecart', verify, async (req, res) => {
    const user_id = req.user.id;
    try {
        const cart = await Cart.findOne({ user_id });
        if (!cart) {
            return res.status(400).send("Not found")
        }
        await Cart.deleteOne({ user_id });
        res.status(200).send("Deleted")
    } catch (error) {
        res.status(500).send(`Internal Server Error${error}`)
    }
})

module.exports = router