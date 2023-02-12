import fs from 'fs';
import crypto from 'crypto';
import cloudinary from 'cloudinary';
import fsPromises from 'fs';

const newUpload = async (req, res, next) => {
  // Configuration
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });

  //  see familija repository for Amazon web Services S3 bucket connection
  let response;
  let error;
  try {
    console.log('here');
    response = await cloudinary.uploader.upload(req.file.path, {
      public_id: new Date(),
    });
  } catch (err) {
    error = err;
    return next(err);
  }
  try {
    console.log('here 2')
    fs.unlink(req.file.path, (err) => {
      //  its not crucial so we wont stop the execution if insuccessfull
      console.log(err);
    });
  } catch (err) {}
  
  

  console.log('response', response);
  res.status(201).json({ secure_url: response.secure_url });
};
export default newUpload;
