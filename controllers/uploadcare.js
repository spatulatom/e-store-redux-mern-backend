import fs from 'fs';
import uploadcare from 'uploadcare';
import { UploadClient } from '@uploadcare/upload-client';

const newUpload = async (req, res, next) => {
  // Configuration
  const client = new UploadClient({ publicKey: process.env.UPLOADCARE_PUBLIC });
  let buffer = fs.readFileSync(req.file.path)

  let response;
  let url;
  try {
    console.log('here2');
    response = await client.uploadFile(buffer);
    url = response.uuid;

    console.log('URL', url);
  } catch (err) {
    console.log(err);
    
    return next(err);
  }
  
    console.log('here5');
    fs.unlink(req.file.path, (err) => {
      //  its not crucial so we wont stop the execution if insuccessfull
      console.log(err);
      //   const error = new HttpError(
      //     'Could not unlink the file.',
      //     500
      //   );
      //   return next(error);
    });


  console.log('here 3', url);
//   res.status(201).json({ secure_url: '' + url });
};
export default newUpload;
