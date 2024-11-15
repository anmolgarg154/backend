import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'




    cloudinary.config({ 
        cloud_name: 'ddntzcs1i', 
        api_key: '184951293422667', 
    //    api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
         api_secret: '<l2ZehY-JBq1YS6sIc8KUqC-iEco>'
    });

    const uploadOnCloudnary = async (localPathFile)=>{
        try {
             if(!localPathFile) return null;

             // upload on cloudnary
            const response  = await cloudinary.uploader.upload(localPathFile,{resource_type:"auto"})

            // file has been upload on cloudnary
            console.log('file upload on cloudnary',response.url);
            return response;

        } catch (error) {
            fs.unlinkSync(localPathFile) // remove the locally saved temporary file as the upload operation got failed
            console.log(error);
            return null;
            
        }
    }
    export {uploadOnCloudnary};