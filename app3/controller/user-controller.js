import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler(async (req,res)=>{
   console.log(req.body);
    const {fullname,username,email,password}=req.body
    console.log(email);
    
})

export  {registerUser}