import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

import { v2 as cloudinary } from 'cloudinary';


    cloudinary.config({ 
        cloud_name: 'ddntzcs1i', 
        api_key: '184951293422667', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });


    const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);