const express=require("express");
let router=express.Router();

var Course=require("../../Models/courses");
const validateCourse=require("../../middleware/validateCourse")
const auth=require("../../middleware/auth");
const admin=require("../../middleware/admin");

//get Productsauth,admin
router.get("/",async(req,res)=>{
    console.log(req.user);
     let course=await Course.find();
     //console.log(products);

return res.send(course);

 });
 
//get single Products
router.get("/:id",async(req,res)=>{
    
  try{  
    let course=await Course.findById(req.params.id);
    if (!course){return res.status(400).send("Course given ID is not present")}
return res.send(course);
  }catch(err){
      return res.send(400).send("Invalid ID")


  }

});

//update router
router.put("/:id",auth,admin,async (req,res) =>{
let course= await Course.findById(req.params.id);
course.Course_Name=req.body.Course_Name; 
course.Course_code=req.body.Course_code;   //
course.Course_Hr=req.body.Course_Hr;
course.Instructor=req.body.Instructor;
course.Fees=req.body.Fees;
course.Description=req.body.Description;

await course.save();
return res.send(course);
});


//delete router
router.delete("/:id",auth,admin,async (req,res) =>{
  let course= await Course.findByIdAndDelete(req.params.id);
 
  return res.send(course);
  });
  
  //insert  router
router.post("/",auth,async (req,res) =>{
  let course= new Course();
  course.Course_Name=req.body.Course_Name; 
  course.Course_code=req.body.Course_code;   //
  course.Course_Hr=req.body.Course_Hr;
  course.Instructor=req.body.Instructor;
  course.Fees=req.body.Fees;
  course.Description=req.body.Description;
  await course.save();
  return res.send(course);
  
  });
  


module.exports=router;