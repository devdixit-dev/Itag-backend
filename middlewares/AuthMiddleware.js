import jwt from 'jsonwebtoken';

const AuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: 'No token provided'
    });
  }

  const decodeJwt = jwt.verify(token, process.env.JWT_SEC);
  const checkRole = decodeJwt.role === 'admin' || decodeJwt.role === 'developer'

  if (!checkRole) {
    return res.json({
      message: `${checkRole} is not authorized`
    })
  }
  req.user = decodeJwt;
  next();
}

export default AuthMiddleware;