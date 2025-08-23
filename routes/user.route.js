import express from 'express';
import { 
  PostApplyForJob,
  PostClientInfo,
  PostNewsletter
} from '../controllers/user.controller.js';
import upload from '../services/multer.service.js';

// User Router
const UserRouter = express.Router();

// User Add Information
UserRouter.post('/client-info', PostClientInfo);

// User Add Newsletter
UserRouter.post('/newsletter', PostNewsletter);

// User Apply For a Job
UserRouter.post('/apply-job', upload.single('resume'), PostApplyForJob);

export default UserRouter;