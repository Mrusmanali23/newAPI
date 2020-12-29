var mongoose=require("mongoose");


var coursesSchema=mongoose.Schema({
    Course_Name: String,
    Course_code: String,
    Course_Hr:Number,
    Instructor:String,
    Fees:{
        type:String,
        default:"Free"
    },
    Description:{
        type:String,
        default:"The Course is for students who to learn and grow daily. Good Luck"
    }
});

var Courses=mongoose.model("courses",coursesSchema);
module.exports=Courses;


