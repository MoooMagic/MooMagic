const express = require('express');
const router = express.Router();
const Product = require('../model/Product');
const nodemailer = require('nodemailer');
const verify = require('../middleware/verify');

router.post('/addproduct',verify,async (req, res) => {
    try {
        const product = await Product.create({
            product_name: req.body.product_name,
            product_desc: req.body.product_desc,
            price: req.body.price,
            product_img: req.body.product_img,
            quantity: req.body.quantity,
            InStock: req.body.InStock,
            createdBy: req.user.id
        });
        res.status(400).json(product)
        console.log(product)
    } catch (error) {
        res.status(500).send(`Intenal Server Error ${error}`)
        console.log(error)
    }
});

router.put('/updateproduct/:id', verify, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(400).send("This product doesnot exists")
        }
        if (product.createdBy != req.user.id) {
            res.status(400).send("You can only update your product")
        }
        const updateproduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        )
        res.status(200).json(updateproduct)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
});

router.delete('/deleteproduct/:id', verify, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(400).send("This product doesnot exists")
        }
        if (product.createdBy != req.user.id) {
            res.status(400).send("You can only delete your product")
        }
        const deleteproduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted")
    } catch (error) {
        res.status(500).send("Internal server error")
    }
});

router.get('/allproducts', async (req, res) => {
    try {
        const allproduct = await Product.find();
        res.status(200).json(allproduct)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
});

router.get('/productid/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product)
        }
        else {
            res.status(400).send("Not found")
        }
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})
router.get('/productbyuser/:id', verify,async (req, res) => {
    if(req.user.id===req.params.id){
        try {
            const product = await Product.find({ createdBy: req.params.id });
            if (product) {
                res.status(200).json(product)
            }
            else {
                res.status(400).send("Not found")
            }
        } catch (error) {
            res.status(500).send("Internal server error")
        }
    }
})

module.exports = router