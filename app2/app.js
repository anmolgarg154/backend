import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';


let a1=express()

a1.use(cors({
    origin:"*",
    credentials:true
}))


// routes import 
import userRouter from './routes/user-routes.js'

a1.use("/users",userRouter)

export {a1}