import  { Router } from 'express';
import { registerUser } from '../controller/user_controller.js';
import { upload } from '../middleware/multer-middleware.js';
let router=Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverImage",
            maxCount:1
        }
    ]) ,
    registerUser)

export default router;