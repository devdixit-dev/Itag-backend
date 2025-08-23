import jwt from 'jsonwebtoken';

export const LoginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'All fields are required for login'
    });
  }

  const isAdmin = username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS
  const isDev = username === process.env.DEV_USER && password === process.env.DEV_PASS

  if (!isAdmin && !isDev) {
    return res.status(400).json({
      message: 'Incorrect email or password'
    });
  }

  const payload = {
    username,
    role: isAdmin ? 'admin' : 'developer'
  }

  const encodeJwt = jwt.sign(payload, process.env.JWT_SEC, { expiresIn: '1h' });

  res.cookie('token', encodeJwt, {
    maxAge: 60 * 60 * 1000,
    secure: true,
    httpOnly: true,
    sameSite: 'none'
  });

  return res.json({
    message: `${username} logged in 🎈`,
    role: payload.role
  });
}

export const VerifyAdmin = async (req, res) => {
  res.status(200).json({ loggedIn: true });
}

export const LogoutAdmin = async (req, res) => {
  res.clearCookie('token');

  return res.status(200).json({
    message: 'User logged out successfully 🫡'
  });
}