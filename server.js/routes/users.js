// this will hash our password to save in database

const router=require("express").Router();
const {User,validate}=require("../models/user");
const bcrypt=require("bcrypt");


router.post("/",async(req,res)=> {
    try{

        const{error}=validate(req.body);
        if(error){
            return res.status(400).send({message:error.details[0].message});
            
        }
        const user=await User.findOne({email:req.body.email});
           if(user){
            return res.status(409).send({message:"user with given email already exits!"})
           }
      const salt=await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword=await bcrypt.hash(req.body.password,salt);
      await new User({...req.body,password:hashPassword}).save();
      res.status(201).send({message :"user created Successfully"})
    }catch(error){
        console.log("I am here");
        res.status(500).send({message :"Internal server error"})

    }
})

module.exports=router;
