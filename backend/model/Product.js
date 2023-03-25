const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product_img: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    InStock: {
        type: Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
    { timestamps: Date }
);

const Product=mongoose.model('product', ProductSchema);
module.exports=Product