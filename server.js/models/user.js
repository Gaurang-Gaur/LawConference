// jsonwebtoken to auth the user
// joi and joi-pass-complexity to validate the data send by the user

const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");
const joi=require("joi");
const passwordComplexity=require("joi-password-complexity");



const userSchema=new mongoose.Schema({
    firstName:{type:"string",require:true},
    lastName:{type:"string",require:true},
    email:{type:"string",require:true},
    password:{type:"string",require:true},
});

// this method which return the json webtoken for the specific user with the payload

// userSchema is a object here we are using method generate auth token on it which we define as

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.KEY,{expiresIn:"7d"});
    return token;
}

// let user model

const User=mongoose.model("user",userSchema);

// let make the function to validate the data
// we using the joi modules which we require joi to object and we are calling object method over it

const validate=(data)=>{
    const schema=joi.object({
        firstName:joi.string().required().label("FirstName"),
        lastName:joi.string().required().label("lastName"),
        email:joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("Password"),

    })

    return schema.validate(data);
}

module.exports={User,validate};