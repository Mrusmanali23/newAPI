var mongoose=require("mongoose");


var usersSchema=mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    Role:{
        type:String,
        default:"user"
    
    }


});

var User=mongoose.model("usersdbs",usersSchema);
module.exports=User;


 