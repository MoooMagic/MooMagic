const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        product_name:{
            type:String,
            required:true
        },
        product_desc:{
            type:String,
            required:true
        },
        product_img:{
            type:String,
            required:true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
        }
    }],
    totalprice: {
        type: Number,
        default: 0
    }
})
const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;