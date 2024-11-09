import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';


    cloudinary.config({ 
        cloud_name: 'ddntzcs1i', 
        api_key: '184951293422667', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudnary = async (localPathFile)=>{
        try {
             if(!localPathFile) return null;
            const response  = await cloudinary.uploader.upload(localPathFile,{resource_type:"auto"})
            console.log('file upload on cloudnary');
            return response;
        } catch (error) {
            fs.unlinkSync(localPathFile) // remove the file
            console.log(error);
            return null;
            
        }
    }
    export {uploadOnCloudnary};

    // const uploadResult = await cloudinary.uploader
    //    .upload(
    //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //            public_id: 'shoes',
    //        }
    //    )
    //    .catch((error) => {
    //        console.log(error);
    //    });
    
    // console.log(uploadResult);