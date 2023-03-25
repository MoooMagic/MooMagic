const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const Cart = require('../model/Cart');

router.post('/addtocart', verify, async (req, res) => {
    try {
        const userid = req.user.id;;
        const { product_id, quantity, price } = req.body;
        const cart = await Cart.findById(userid);
        if (cart) {
            const itemindex = cart.item.findIndex(p => p.product_id === product_id);
            if (itemindex >= -1) {
                let productitem = cart.item[itemindex];
                productitem.quantity += quantity;
                cart.item[itemindex] = productitem;
            } else {
                cart.item.push({ product_id, quantity, price })
            }
            cart.totalprice += cart.quantity * price;
            await cart.save()
            res.status(200).json({ cart })
        }
        else {
            const newcart = await Cart.create({
                user_id: req.user.id,
                item: [{ product: product_id, quantity, price }],
                totalprice: quantity * price
            });
            res.status(200).json({ cart: newcart })
        }
    } catch (error) {
        res.status(500).send(`Intenal Server Error ${error}`)
        console.log(error)
    }
})
module.exports=router