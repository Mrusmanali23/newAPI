const express=require("express");
let router=express.Router();
let User=require("../../Models/user");
var bcrypt=require("bcryptjs");
//var  lodash=require;
const jwt=require("jsonwebtoken");
const _=require("lodash");
const config=require("config");


router.post("/register",async(req,res)=>{
let user=await User.findOne({Email:req.body.Email});
if(user) return res.status(400).send("User with given Email already email exist");
user=new User();
user.Name=req.body.Name;
user.Email=req.body.Email;
user.Password=req.body.Password;
user.Role=req.body.Role;

let salt=await bcrypt.genSalt(10);
user.Password= await bcrypt.hash(user.Password,salt);
//await user.generateHashedPassword();
await user.save();
let token=jwt.sign(
       {_id:user._id,Name:user.Name,Role:user.Role},
         config.get("MongoDB.jwtPrivateKey"));
    
    let datatoReturn={
        Name: user.Name,
        Email:user.Email,
        Role:user.Role,
        token:user.token,
    };
   
return res.send(datatoReturn);
});

router.post("/login",async(req,res)=>{
    let user=await User.findOne({Email:req.body.Email});
    if(!user) return res.status(400).send("User not Register");
    let isValid=await bcrypt.compare(req.body.Password,user.Password);
    if(!isValid) return res.status(401).send("Invalid Password");
   let token=jwt.sign(
       {_id:user._id,name:user.Name},
    config.get("MongoDB.jwtPrivateKey"));
    res.send(token); 
});
module.exports=router;