
import  express from 'express'
import { connectDb } from './db/userDb.js'
import dotenv from 'dotenv';
dotenv.config();

let app=express()
let port =process.env.PORT


connectDb();

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
    
})
