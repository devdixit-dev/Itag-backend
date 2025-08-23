import express from 'express';
import { 
  LoginAdmin,
  LogoutAdmin,
  VerifyAdmin
} from '../controllers/auth.controller.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const AuthRouter = express.Router();

AuthRouter.post('/login/admin', LoginAdmin);

AuthRouter.get('/verify/admin', AuthMiddleware, VerifyAdmin);

AuthRouter.post('/logout', AuthMiddleware, LogoutAdmin)

export default AuthRouter;