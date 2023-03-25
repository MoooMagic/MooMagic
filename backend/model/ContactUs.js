const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactUsschema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        default: "No Subject Provided",
    },
    description: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('contact', ContactUsschema);
module.exports = Contact