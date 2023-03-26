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