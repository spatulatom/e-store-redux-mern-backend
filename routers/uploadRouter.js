import express from 'express';
import { isAdmin, isAuth, fileUpload } from '../utils.js';
// import newUpload from '../controllers/upload-cloudinary.js';
import newUpload from '../controllers/uploadcare.js';


const uploadRouter = express.Router();
uploadRouter.post('/', isAuth, isAdmin, fileUpload.single('file'), newUpload
);

export default uploadRouter;
