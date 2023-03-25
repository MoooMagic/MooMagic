const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    isRetailer: {
        type: Boolean,
        default: false
    }
},
    { timestamps: Date }
);

const User = mongoose.model('user', UserSchema);
module.exports = User