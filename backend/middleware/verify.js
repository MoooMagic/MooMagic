const jwt=require('jsonwebtoken');

const verify=(req,res,next)=>{
    const header=req.headers.authorization;
    const token=header.split(" ")[1];
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                res.status(403).send(`Token is not valid ${err}`)
            }
            req.user=user
            next();
        });
    }
    else{
        res.status(500).send("You are not authinticated")
    }
};

module.exports=verify