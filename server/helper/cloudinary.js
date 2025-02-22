const cloudinary = require('cloudinary').v2;
const multer = require('multer');



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage =new multer.memoryStorage()


async function uploadimage(file){
  try {
     
    
      const result = await cloudinary.uploader.upload(file, {
          resource_type: "auto",
      })
      
      return result;
  } catch (error) {
    console.log("cloudinary upload error",error);
    
  }
}

const upload = multer({  storage })

module.exports = { uploadimage, upload }