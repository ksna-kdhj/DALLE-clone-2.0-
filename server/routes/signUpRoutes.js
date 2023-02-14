import express from "express";
import * as dotenv from "dotenv";
// import Log from '../mongodb/models/log'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import User from '../mongodb/models/log.js'
import passwordComplexity from 'joi-password-complexity'
dotenv.config();
const router = express.Router();
const validate= (data)=>{
    const schema = Joi.object({
    firstName:Joi.string().required().label('firstName'),
     lastName:Joi.string().required().label('lastName'),
     email:Joi.string().email().required().label('email'),
     pwd:passwordComplexity().required().label('password'),
    })
    return schema.validate(data)
  }
router.route('/').post(async(req,res)=>{
    try{
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send({message:error.details[0].message})
    }
    const user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(409).send({message:"User with given email already exists!"})
        }
        const salt = await bcrypt.genSalt(Number("10"));
		const hashPassword = await bcrypt.hash(req.body.pwd, salt)
        await new User({ ...req.body, pwd: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
    }
    catch(err){
    console.log(err)
    res.status(500).send({message:"Internal Server Error"})
    }
})

// const Validate =(form)=>{
//     const schema = Joi.object({
//         name: Joi.string().required().label('Email'),
//         pwd: Joi.string.required.label('pwd')
//     })
//     return schema.validate(form)
// }
export default router