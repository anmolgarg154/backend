
import  express from 'express'
import { connectDb } from './db/userDb.js'
let app=express()
let port =3000



connectDb()
app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(port)
