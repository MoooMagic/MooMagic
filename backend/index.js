const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser=require('cookie-parser')
const connection = require('./config/Database');

dotenv.config({ path: './config/.env' })

const port = process.env.PORT || 8080;

app.use(express.json())
app.use(cookieParser())


connection()

app.use(cors())

app.use('/api/auth', require('./controller/UserController'))
app.use('/api/user', require('./controller/ContactUsController'))
app.use('/api/product', require('./controller/ProductController'))
app.use('/api/cart', require('./controller/CartController'))
app.use('/api/razorpay', require('./controller/RazorpayController'))



app.listen(port,() => {
    console.log(`Server running on port:${port}, http://localhost:${port}`)
})