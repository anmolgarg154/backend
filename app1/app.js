
import  express from 'express'
let app=express()
import web from './routes/web.js'

let port =3000
app.use("/",web)

app.listen(port,()=>{
  console.log(`server at http://localhost:${port}`);
  
})
