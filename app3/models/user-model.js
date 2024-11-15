import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema= mongoose.Schema({
    userName:{
        type:String,
        index:true,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true
    },
    fullName:{
        type:String,
        index:true,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
    },
    avatar:{
        type:String,
        required:true,

    },
    coverImager:{
        type:String,
        required:true,
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    refreshToken:{
        type:String
    }
},{Timestamps:true})


userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

     this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    
 return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = function (){
    jwt.sign({
        _id:this.id,
        email:this.email,
        userNAme:this.userNAme,
        fullName:this.fullName
    },
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5tb2wifQ.FNLF7hPy5yPnv6wgglxiMYegzm6DAYH6VYVVIs4zxBw,
    {
        expiresIn:"1d"
    }
  )
}
userSchema.methods.generateRefreshToken = function (){
    jwt.sign({
        _id:this.id,
    },
    chaiAurCode,
    {
        expiresIn:"10d"
    }
  )
}



export const userModel = mongoose.model("usermodel",userSchema)