import { ApiError } from "../utlis/apiError.js";
import {asyncHandler} from "../utlis/async-handler.js"
import {user} from '../model/user-model.js'
import {uploadOnCloudnary} from '../utlis/cloudnary.js'
import {ApiResponse} from "../utlis/apiResponse.js"

let registerUser =asyncHandler(async (req,res)=>{
   const {fullName,password,email,userName}=req.body
   console.log('email: ',email);

//    get user details from frontend
//   validation - not empty
//  chexk if user already exists: username,email
//  check for images, check for avator
//  upload them to cloudnary, avator
//  create user object -create entry in db
//   remove password and refresh token field from response
//  check for user creation
//  return res


   // simple method of validation

//   if(fullName===""){
//     throw new ApiError(400,"fullname is required")
//    }
  
// best method of validation

    if([fullName,password,email,userName].some((field)=>field.trim()===""))
    {
        throw new ApiError(400,"all fields is required")
    }
      
    const exitedUser=user.findOne({
        $or:[{ userName },{ email }]
    })

    if(exitedUser)
    {
        throw new ApiError(409,"username or email is already exists")
    }

    const avatorLocalPath = req.files?.avator[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatorLocalPath)
    {
        throw new ApiError(400,"avator file is required")
    }

      const avator= await uploadOnCloudnary(avatorLocalPath)
      const coverImage = await uploadOnCloudnary(coverImageLocalPath);

      if(!avator){
        throw new ApiError(400,"avator file is required")
      }

     const userData= user.create({
        fullName,
        avator:avator.url,
        coverImage:coverImage?.url || '',
        email,
        password,
        userName:userName.lowerCase()
      })
       const createdUser = await userData.findById(userData._id).select("-password  -refreshtoken")
       if(!createdUser)
       {
        throw new ApiError(500, "something went wrong while registering")
       }
        
       return res.status(201).json(
         new ApiResponse(200,createdUser,"User registered successfully")
       )
})
export {registerUser}