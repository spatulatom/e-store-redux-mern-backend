import fs from 'fs';
import crypto from 'crypto';
import cloudinary from 'cloudinary';
import path from 'path';

const newUpload = async (req, res, next) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });

  let buffer = fs.readFileSync(req.file.path)

  //  see familija repository for Amazon web Services S3 bucket connection
  let response;
  let error;
  let deletePicture = false;
  try {
    console.log('here2');
    response = await cloudinary.uploader.upload(req.file.path, {resource_type: "raw",
      public_id: Date.now(),
    });
    deletePicture = true;
  } catch (err) {
    console.log(err)
    deletePicture = true;
    return next(err);
  }
  if(deletePicture){
    console.log('here5')
    fs.unlink(req.file.path, (err) => {
      //  its not crucial so we wont stop the execution if insuccessfull
      console.log(err);
      //   const error = new HttpError(
      //     'Could not unlink the file.',
      //     500
      //   );
      //   return next(error);
    });}

  console.log('here 3', response);
  res.status(201).json({ secure_url: response.secure_url });
};
export default newUpload;
