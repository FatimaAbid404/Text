const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');
const JWT_SECRET='fatimaisgoodgirl';

//Route1
//Create a User using :POST "/api/auth/" not requir auth
//through get password would be visible in log files
router.post('/createuser',[
    body('name','Enter Valid name').isLength({min:3}),
    body('email','Enter Valid email').isEmail(),
    body('password').isLength({min:5})
],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{

    
    //check whetherthe user with this email exists already
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"sorry user with email exists"})
    }
    //wait until promise resolve
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);

    user=await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email
      })
    //   .then(user => res.json(user)).catch(err=>{console.log(err)
    //    res.json({error:'please enter a unique value for email',message:err.message})})
   //npm install jsonwebtoken to verify user, give token after authentication
   //sign secret with secret to json token, verify token to give info

   const data={
    user:{
        id:user.id
    }
   }
   const authtoken=jwt.sign(data,JWT_SECRET);
   //console.log(jwtData);
   //auth token can be convertedto data
   //thru jwt secrert we cangetto knoe who is playing with dat
   res.json({authtoken})
}catch(error){
    

    console.error(error.message);
    res.status(500).send("Some Error Occured");
}

})
//route2:Authenticate
router.post('/login',[
    body('email','Enter Valid email').isEmail(),
    body('password','can not be blank').exists()

],async(req,res)=>{
    //return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"enter correct credentials"});
        }
        //match password which is entered with user's paassword
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"enter correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
           }
           const authtoken=jwt.sign(data,JWT_SECRET);
           res.json({authtoken})

    }
    catch(error){
        console.error(error.message);
    res.status(500).send("Internal server error");

    }
})
//route3:Get Loggedin User Details api/auth/getuser
router.get('/getuser',fetchuser,async(req,res)=>{
try{
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)

}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
}  
})
module.exports=router