require('dotenv').config()
let express =require('express')
let app=express()

let port =3000
app.get("/",(req,res)=>{
    res.render('a1.ejs')
})
app.get("/about/:name/:age",(req,res)=>{
  console.log( req.params.aa);
    res.send(`name-${req.params.name} age-${req.params.age}`)
    res.send(req.params)
})
app.listen(process.env.PORT)
