import express from 'express';
import { PostApplyForJob, PostClientInfo, PostNewsletter } from '../controllers/user.controller.js';
import upload from '../services/multer.service.js';

const UserRouter = express.Router();

UserRouter.post('/client-info', PostClientInfo);

UserRouter.post('/newsletter', PostNewsletter);

UserRouter.post('/apply-job', upload.single('resume'), PostApplyForJob);

export default UserRouter;