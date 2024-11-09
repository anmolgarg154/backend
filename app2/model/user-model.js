import mongoose, { mongo, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
let userSchema= mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowerCase:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:[true,"email must unique"],
            lowerCase:true
        },
        password:{
            type:String,
            required:[true,"Password must required"],
            unique:true,
            lowerCase:true,
        },
        fullname:{
            type:String,
            required:[true,"fullname must required"],
            unique:true,
            lowerCase:true,
        },
        watchHistory:[{
            type:Schema.Types.ObjectId,
            ref:"Video"
        }],
        coverImage:{
            type:String,
            required:true
        },
        avator:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        }
        
    },
    {timestamps:true}
)

userSchema.pre("save", async function (next){
    if(! this.ismodified("password")) return next();

   this.password = await bcrypt.hash(this.password,10)
   next()
})
userSchema.method.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function (){
   return  jwt.sign({
          _id:this._id,
          email:this.email,
          username:this.username,
          fullname:this.fullname
        },
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5tb2wifQ.FNLF7hPy5yPnv6wgglxiMYegzm6DAYH6VYVVIs4zxBw  ,
        {  
            expiresIn:"1d"
        }
    )
}
userSchema.methods.generateRefreshToken=function (){
    return  jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
      },
       123  ,
      {  
          expiresIn:"10d"
      }
  )
}

export let userModel=mongoose.model("User",userSchema)
