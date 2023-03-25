const express = require('express');
const router = express.Router();
const Contact = require('../model/ContactUs');
const nodemailer = require('nodemailer');

router.post('/contactus', async (req, res) => {
    try {
        const contact = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            description: req.body.description,
        });
        res.status(200).json(contact)
        console.log(contact)


        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smpt.gmail.com",
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: 'moooomagic@gmail.com',
            to: req.body.email,
            subject: "Regarding your query/issue - Response to follow up later",
            text: `Dear ${req.body.name},

I hope this email finds you well. I am writing to inform you that we have received your query/issue that is "${req.body.description}"and we appreciate you bringing it to our attention.
Please be assured that we are currently looking into your matter and will get back to you as soon as possible with an appropriate response. However, due to the nature of the issue and the complexity of the investigation, it may take some time to provide you with a comprehensive solution.
                
    We understand that this may cause inconvenience, but please rest assured that we are doing everything possible to resolve the matter at the earliest. Our team is working diligently to provide you with the best possible outcome and we appreciate your patience in the meantime.
    We value your business and want to ensure that we address your concerns effectively. If you have any further questions or concerns in the meantime, please do not hesitate to contact us and we will be more than happy to assist you.
                
        Thank you for your understanding and cooperation.
                
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

    } catch (error) {
        res.status(500).send(`Internal Server Error ${error}`)
        console.log(error)
    }
});

module.exports = router