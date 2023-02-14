import mongoose from "mongoose";
import passwordComplexity from 'joi-password-complexity'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
 const userSchema= new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    pwd:{type:String, required:true},
 })
 userSchema.methods.generateAuthToken = function(){
   const token =jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY,{
      expiresIn:"7200s"
   })
   return token
 }
 userSchema.methods.generateRefreshToken = function(){
  const refreshToken = jwt.sign(
    { "username": foundUser.username },
    process.env.RESFRESHPRIVATEKEY,
    { expiresIn: '1d' }
)
return token
}

 const User = mongoose.model('User',userSchema);

 const validate= (data)=>{
   const schema = Joi.object({
   firstName:Joi.string().required().label('firstname'),
    lastName:Joi.string().required().label('lastname'),
    email:Joi.string().email().required().label('email'),
    pwd:passwordComplexity().required().label('password'),
   })
   return schema.validate(data)
 }

 export default User