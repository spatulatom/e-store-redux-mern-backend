import fs from 'fs';
import crypto from 'crypto';
import cloudinary from 'cloudinary';

const newUpload = async (req, res, next) => {
  // Configuration
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });

  //  see familija repository for Amazon web Services S3 bucket connection
  let response;
  try {
    console.log('here');
    response = await cloudinary.uploader.upload(req.file.path, {
      public_id: crypto.randomUUID(),
    });
  } catch (err) {
    const error = new HttpError(
      'Creating new post failed, server error, please try again in a minute.',
      500
    );
    return next(error);
  }
  // response

  //   .then((data) => {
  //     console.log('Cloudinary response', data);
  //     console.log(data.secure_url);

  // fs.unlink(req.file.path, (err) => {
  //   //  its not crucial so we wont stop the execution if insuccessfull
  //   console.log(err);
  //   return;
  //   //   const error = new HttpError(
  //   //     'Could not unlink the file.',
  //   //     500
  //   //   );
  //   //   return next(error);
  // });

  console.log('response', response)
  res.status(201).json({ secure_url: response.secure_url });

  //  res.json({ url: result.Location });
  // })
  // .catch((err) => {
  //   console.log('ErroRR', err);
  //   return next(new HttpError(err, err.statusCode));
  // });
};
export default newUpload;
