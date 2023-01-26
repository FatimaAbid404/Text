//function called when request made on login required resquest made
var jwt = require('jsonwebtoken');
const JWT_SECRET='fatimaisgoodgirl';

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authentictae using valid token"})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();

    }catch(error){
        res.status(401).send({error:"please authenticate using vlid token"})
    }
    
}
module.exports=fetchuser;