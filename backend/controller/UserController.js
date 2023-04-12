const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const verify = require('../middleware/verify');

router.post('/register', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(409).send("User already registered")
        }
        user = await User.findOne({ phonenumber: req.body.phonenumber });
        if (user) {
            res.status(409).send("User already resgistered")
        }
        else {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hash = await bcrypt.hash(req.body.password, salt)
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                phonenumber: req.body.phonenumber,
                isSeller: req.body.isSeller,
                isRetailer: req.body.isRetailer
            });
            res.status(200).send(user)
            console.log(user)

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASSWORD,
                }
            });
            const mailOptions = {
                from: 'moooomagic@gmail.com',
                to: req.body.email,
                subject: "Welcome moooooo's",
                text: `Dear ${req.body.name},
Greetings!

We are delighted to welcome you as a new member of our community. Thank you for registering with us. We hope that your experience with us will be productive and enjoyable.

As a registered member, you now have access to a wide range of services and resources that are designed to help you achieve your goals. Whether you are looking for information, assistance or support, we are here to help you in any way we can.

We encourage you to explore our website and take advantage of all the resources we have to offer. From our online forums to our helpful support team, we are committed to providing you with the best possible experience.

If you have any questions or concerns, please do not hesitate to reach out to us. We are here to help you and ensure that you have a positive experience with us.

Thank you for choosing to be a part of our community. We look forward to working with you and seeing you thrive.

Best regards,

MooMagic Team`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Email sent ${info.response}`)
                }
            });
        }
    } catch (error) {
        res.status(500).send(`Internal Server Error${error}`)
        console.log(error)
    }
}),


    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const logger = await User.findOne({ email });
            if (!logger) {
                res.status(400).send("User not registered")
            }
            const compare = await bcrypt.compare(password, logger.password);
            if (!compare) {
                res.status(400).send("Wrong credentials")
            }
            const acessToken = jwt.sign({ id: logger._id, isSeller: logger.isSeller, isRetailer: logger.isRetailer }, process.env.JWT_SECRET, { expiresIn: "5d" });
            //res.cookie('token', acessToken, { httpOnly: true, expire: new Date(Date.now()+5*24*60*60*1000)}).status(200).json({ acessToken })
            res.status(200).json({ acessToken,userid:logger._id})
        } catch (error) {
            res.status(500).send(`Internal Sever error${error}`)
            console.log(error)
        }
    });

router.post('/logout', async (req, res) => {
    try {
        res.clearCookie('token').status(200).send("Logout Successful")
        console.log("Logout successful")
    } catch (error) {
        res.status(500).send(`Internal Sever error${error}`)
        console.log(error)
    }
});

router.put('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id) {
        try {
            const update = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true },
            );
            res.status(200).send(update)
        } catch (error) {
            res.status(500).send(error)
        }
    }
    else {
        res.status(500).send("you can only update your account")
    }
})

router.delete('/delete/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id) {
        try {
            const deleteuser = await User.findByIdAndDelete(req.params.id);
            res.status(200).send(`Account deletion successfull${deleteuser}`)
        } catch (error) {
            res.status(500).send(error)
        }
    } else {
        res.status(500).send("You can only delete your own account")
    }
})

router.get('/user/:id', verify,async (req, res) => {
    try {
        if(req.user.id===req.params.id){
            const user = await User.findById(req.params.id).select("-password");
            res.status(200).send(user)
        }
        else{
            res.status(500).send("You can only view your own account")
        }
    } catch (error) {
        res.status(500).send("Server Error")
    }
})

module.exports = router