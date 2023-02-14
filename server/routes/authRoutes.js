import express from "express";
import * as dotenv from "dotenv";
// import Log from '../mongodb/models/log'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import User from '../mongodb/models/log.js'
import jwt from 'jsonwebtoken'
dotenv.config();
const router = express.Router();
router.route('/').post(async(req,res)=>{
    try{
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send({message:error.details[0].message})
    }
    const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(401).send({message:"Invalid email or password"})
        }
        const validPwd = await bcrypt.compare(req.body.pwd,user.pwd)
        if (!validPwd){
            return res.status(401).send({message:"Invalid email or password"})
        }
        const accessToken = user.generateAuthToken();
        // const refreshToken = user.generateRefreshToken();
        // res.cookie('jwt', refreshToken, {
        //     httpOnly: true, 
        //     secure: true,
        //     sameSite: 'None', 
        //     maxAge:  24 * 60 * 60 *1000
        // })
		res.status(200).send({ data: accessToken, message: "logged in successfully" });
    }
catch(err){
    res.status(500).json({message:"Internal Server Error"})
}
})

// router.route('/refresh').post(async(req,res)=>{
//     const cookies = req.cookies

//     if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

//     const refreshToken = cookies.jwt
//     jwt.verify(
//         refreshToken,
//         process.env.RESFRESHPRIVATEKEY,
//         async (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidden' })

//             const foundUser = await User.findOne({ email: decoded.email }).exec()

//             if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

//             const accessToken = jwt.sign(
//                 { "username": foundUser.email },
//                 process.env.RESFRESHPRIVATEKEY,
//                 { expiresIn: '7200s' }
//             )
//             res.json({ accessToken })
//         }
//     )

//         })
//     router.route('/logout').post(async(req,res)=>{
//     const cookies = req.cookies
//     if (!cookies?.jwt) return res.sendStatus(204) //No content
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
//     res.json({ message: 'Cookie cleared' })
//     })



const validate =(form)=>{
    const schema = Joi.object({
        email: Joi.string().required().label('email'),
        pwd: Joi.string().required().label('pwd')
    })
    return schema.validate(form)
}
// const validate= (form)=>{
//     const schema = Joi.object({
//     firstName:Joi.string().required().label('first name'),
//      lastName:Joi.string().required().label('last name'),
//      email:Joi.string().email().required().label('Email'),
//      pwd:passwordComplexity().required().label('Password'),
//     })
//     return schema.validate(data)
//   }
export default router
