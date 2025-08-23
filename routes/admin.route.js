import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import { 
  AdminAddGuide,
  AdminAddReport,
  AdminAddVideo,
  AdminGetAllClients,
  AdminGetAllEmails,
  AdminGetAllGuides,
  AdminGetAllJobApps,
  AdminGetAllReports,
  AdminGetAllVideos,
  AdminPostJobApp,
  AdminRemoveEmail,
  AdminRemoveGuide,
  AdminRemoveReport,
  AdminRemoveVideo
} from '../controllers/admin.controller.js';
import upload from '../services/multer.service.js';

const AdminRouter = express.Router();

AdminRouter.post('/emails', AuthMiddleware, AdminGetAllEmails);

AdminRouter.post('/remove/email/:id', AuthMiddleware, AdminRemoveEmail);

AdminRouter.get('/clients', AuthMiddleware, AdminGetAllClients);

AdminRouter.post('/post-job', AuthMiddleware, AdminPostJobApp);

AdminRouter.get('/job-apps', AuthMiddleware, AdminGetAllJobApps);

AdminRouter.post('/add-report', AuthMiddleware, upload.single('report'), AdminAddReport);

AdminRouter.get('/reports', AuthMiddleware, AdminGetAllReports);

AdminRouter.post('/remove/report/:id', AuthMiddleware, AdminRemoveReport);

AdminRouter.post('/add-guide', AuthMiddleware, upload.single('guide'), AdminAddGuide);

AdminRouter.get('/guides', AuthMiddleware, AdminGetAllGuides);

AdminRouter.post('/remove/guide/:id', AuthMiddleware, AdminRemoveGuide);

AdminRouter.post('/add-video', AuthMiddleware, AdminAddVideo);

AdminRouter.get('/videos', AuthMiddleware, AdminGetAllVideos);

AdminRouter.post('/remove/video/:id', AuthMiddleware, AdminRemoveVideo);

export default AdminRouter;