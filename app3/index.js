import express from "express";
import dotenv from "dotenv"
import connectDb from "./db/userDb.js";
import { app } from "./app.js";
const apps=express()

dotenv.config()
const port=process.env.PORT

connectDb()
app.use(app)

apps.get("/",(req,res)=>{
    res.send("hello");
})

apps.listen(port,()=>{
    console.log(`server at http://localhost:${port}`);
    
})