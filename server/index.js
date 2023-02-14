import express from 'express';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import authRoutes from './routes/authRoutes.js'
// import userRoutes from './routes/userRoutes.js'
import signUpRoutes from './routes/signUpRoutes.js'
dotenv.config();

const app = express();
app.use(cors(),express.json({limit:'50mb'}))
app.use(cookieParser())
app.use('/api/v1/post',postRoutes)
app.use('/api/v1/dalle',dalleRoutes)
app.use('/v1/auth',authRoutes)
app.use('/v1/signUp',signUpRoutes)
// app.use('/v1/user',userRoutes)

app.get('/',async(req,res)=>{
    res.send('Hello from DALL-E!');
})
const startServer= async () =>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080,()=> 
        console.log('Server has started on port http://localhost:8080'))
    }catch(error){
        console.log(error)
    }
}
startServer();