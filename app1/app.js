import cors from 'cors'
import  express from 'express'
import web from './routes/web.js'
let app=express()
let port =3000

app.use(cors())
app.use("/",web)

app.listen(port,()=>{
  console.log(`server at http://localhost:${port}`);
  
})
