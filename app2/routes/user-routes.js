import  { Router } from 'express';
import { registerUser } from '../controller/user_controller.js';
import { upload } from '../middleware/multer-middleware.js';
let router=Router();

router.route("/register").post(
    upload.fields([
        {},{}
    ]) ,registerUser)

export default router;