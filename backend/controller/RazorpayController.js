const razorpay = require('razorpay');
const crypto = require('crypto');
const express=require('express');
const router=express.Router();


const instance = new razorpay({
    key_id:process.env.KEYID,
    key_secret:process.env.KEYSECRET
});

router.post('/createorder',async(req,res)=>{
    const {amount,currency,receipt,notes}=req.body;
    console.log(amount,currency,receipt,notes);
    instance.orders.create({amount:amount*100,currency,receipt,notes},(err,order)=>{
        if(err){
            res.status(400).send('Error')
            console.log(err);
        }
        else{
            res.status(200).send({data:order});
        }
    })
}),
router.post('/verify',async(req,res)=>{
    let body=req.body.razorpay_order_id+"|"+req.body.razorpay_payment_id;
    console.log(body)
    var expectedsignature=crypto.createHmac('sha256',process.env.KEYSECRET).update(body.toString()).digest('hex');
    if(expectedsignature==req.body.razorpay_signature){
        res.status(200).send("Payment Successful");
    }
    else{
        res.status(400).send("Payment Failed");
    }
})
module.exports=router;