import mongoose, { mongo } from "mongoose";
let userSchema= mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:[true,"email must unique"]
        },
        password:{
            type:String,
            required:[true,"Password must required"],
            lowerCase:true,
        }
    },{timestamps:true}
)
let userModel=mongoose.model("User",userSchema)
export default userModel;