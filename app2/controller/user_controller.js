import { ApiError } from "../utlis/apiError.js";
import {asyncHandler} from "../utlis/async-handler.js"
import {User } from '../model/user-model.js'
import {uploadOnCloudnary} from '../utlis/cloudnary.js'
import {ApiResponse} from "../utlis/apiResponse.js"

 const generateAccessAndRefreshToken =async(userId)=>{
  try {
    const user = await User.findById(userId)
   const accessToken =  user.generateAccessToken()
   const refreshToken =  user.generateRefreshToken()

   user.refreshToken = refreshToken
   await user.save({ validateBeforeSave: false })

   return {accessToken, refreshToken}


  } catch (error) {
    throw new ApiError(500,"something went wrong while accessing access and refresh token")
  }
 }


let registerUser =asyncHandler(async (req,res)=>{
    // res.status(200).json({mesage:"ok"})


//    get user details from frontend
//   validation - not empty
//  chexk if user already exists: username,email
//  check for images, check for avator
//  upload them to cloudnary, avator
//  create user object -create entry in db
//   remove password and refresh token field from response
//  check for user creation
//  return res

  
   const {fullName,password,email,userName} = req.body
    console.log('email: ',email);
    console.log(req.body);

   // simple method of validation

  // if(fullName === ""){
  //   throw new ApiError(400,"fullname is required")
  //  }
  
//    best method of validation

    if([fullName,password,email,userName].some((field) => field?.trim() === ""))
    {
        throw new ApiError(400,"all fields is required")
    }
      
    const exitedUser= await User.findOne({
        $or: [{ userName },{ email }]
    })

    if(exitedUser)
    {
        throw new ApiError(409,"username or email is already exists")
    }

     const avatarLocalPath = req.files?.avatar[0]?.path;
    //  console.log("PPATH",avatarLocalPath);
     
   // const coverImageLocalPath = req.files?.coverImage[0]?.path;
   let coverImageLocalPath;
   if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
       coverImageLocalPath = req.files.coverImage[0].path
   }

    if(!avatarLocalPath)
    {
        console.log("avatar : ",avatarLocalPath );
        
        throw new ApiError(400,"avatar filee is required")
    }

      const avatar= await uploadOnCloudnary(avatarLocalPath)
      const coverImage = await uploadOnCloudnary(coverImageLocalPath);

    //   console.log('ava : ',avatar);
      
      if(!avatar){
        console.log("ava2",avatar);
        
        throw new ApiError(400,"avatar file is required")
      }

     const  user= await User.create({
         fullName,
         avatar:avatar.url,
         coverImage:coverImage?.url || "",
        email,
        password,
        userName:userName.toLowerCase()
      })

       const createdUser =await User.findById(user._id).select("-password  -refreshToken ")
       if(!createdUser)
       {
        throw new ApiError(500, "something went wrong while registering")
       }
        
       return res.status(201).json(
         new ApiResponse(200,createdUser,"User registered successfully")
       )
})

const loginUser = asyncHandler(async (req, res) =>{
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const {email, username, password} = req.body
  console.log(email);

  if (!username && !email) {
      throw new ApiError(400, "username or email is required")
  }
  
  // Here is an alternative of above code based on logic discussed in video:
  // if (!(username || email)) {
  //     throw new ApiError(400, "username or email is required")
      
  // }

  const user = await User.findOne({
      $or: [{username}, {email}]
  })

  if (!user) {
      throw new ApiError(404, "User does not exist")
  }

 const isPasswordValid = await user.isPasswordCorrect(password)

 if (!isPasswordValid) {
  throw new ApiError(401, "Invalid user credentials")
  }

 const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
      new ApiResponse(
          200, 
          {
              user: loggedInUser, accessToken, refreshToken
          },
          "User logged In Successfully"
      )
  )

})

 const logoutUser = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
          $set: {
              refreshToken : undefined  // this removes the field from document
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged Out"))
})


export {registerUser,loginUser,logoutUser
}