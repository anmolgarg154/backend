import { ApiError } from "../utlis/apiError.js";
import { asyncHandler } from "../utlis/async-handler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user-model.js";

export const verifyJWT =asyncHandler(async(res,req,next)=>{
try {
      const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")


        console.log(token);
    
      if (!token) {
        throw new ApiError(401,"Unauthorized token")
      }
    
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
    const user= await User.findById(decodedToken?._id).select("-password -redreshToken")
    
     if (!user) {
        throw new ApiError(401,"invalid accessToken")
     }
    
    
      req.user=user;
      next()
} catch (error) {
    throw new ApiError(401,error.message || "Invalid access Token")
}

})