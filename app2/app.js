import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';


let a1=express()

a1.use(cors({
    origin:"*",
    credentials:true
}))
a1.use(express.json({limit:"16kb"}))
a1.use(express.urlencoded({extended:true,limit:"20kb"}))
a1.use(express.static("public"))
a1.use(cookieParser())

// routes import 
import userRouter from './routes/user-routes.js'

a1.use("/api/users",userRouter)

export {a1}