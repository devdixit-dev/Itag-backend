import express from 'express';
import { 
  LoginAdmin,
  LogoutAdmin,
  VerifyAdmin
} from '../controllers/auth.controller.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

// Auth Router
const AuthRouter = express.Router();

// Admin Login
AuthRouter.post('/login/admin', LoginAdmin);

// Admin Verify
AuthRouter.get('/verify/admin', AuthMiddleware, VerifyAdmin);

// Admin Logout
AuthRouter.post('/logout', AuthMiddleware, LogoutAdmin)

export default AuthRouter;