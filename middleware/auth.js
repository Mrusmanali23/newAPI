const jwt=require("jsonwebtoken");

const config=require("config");
//const {validate}=require("../Models/product")
const user=require("../Models/user");
async  function auth(req,res,next){
let token=req.header("x-auth-token");
if (!token) return res.status(400).send("Token Not provided")

try{
let user=jwt.verify(token,config.get("MongoDB.jwtPrivateKey"))
req.user=await User.findById(user._id); }
catch(err){

    return res.status(401).send("Invalid Token");
}
next();
}
module.exports=auth