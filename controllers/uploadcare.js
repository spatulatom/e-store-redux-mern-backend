import fs from 'fs';
import uploadcare from 'uploadcare';
import { UploadClient } from '@uploadcare/upload-client';
import path from 'path';

// Resources:
// https://github.com/uploadcare/uploadcare-js-api-clients/blob/master/packages/upload-client/README.md
// https://uploadcare.com/community/t/setting-correct-content-type-for-images/716/4


const newUpload = async (req, res, next) => {
  // Configuration
  const client = new UploadClient({ publicKey: process.env.UPLOADCARE_PUBLIC });
  let buffer = fs.readFileSync(req.file.path);

  let response;
  let url;
  // this config here is a guess inspired by second resource above, default type is 
  // contenttype: application/octet-stream and it dosent display on the front end
  const type = {contentType: 'image/jpeg'};
  try {
    console.log('here2');
    response = await client.uploadFile(buffer, type);
    url = response.uuid;

    console.log('URL', response);
  } catch (err) {
    console.log('TUTAJ', err);

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
  res
    .status(201)
    .json({
      secure_url: 'https://ucarecdn.com/' + url + '/'
    });
};
export default newUpload;
