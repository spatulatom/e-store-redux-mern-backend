import express from 'express';
import { isAdmin, isAuth, fileUpload } from '../utils.js';
import newUpload from '../controllers/upload-cloudinary.js';


const uploadRouter = express.Router();
uploadRouter.post('/', isAuth, isAdmin, newUpload
);

export default uploadRouter;
