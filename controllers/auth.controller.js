import jwt from 'jsonwebtoken';

/**
 * POST /auth/login/admin
 * Logs in admin or developer and sets JWT cookie
 */
export const LoginAdmin = async (req, res) => {
  const { username, password } = req.body;

  // ✅ Input validation
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required for login' });
  }

  // ✅ Credential checks (environment-based)
  const isAdmin = username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS;
  const isDev = username === process.env.DEV_USER && password === process.env.DEV_PASS;

  if (!isAdmin && !isDev) {
    return res.status(400).json({ message: 'Incorrect username or password' });
  }

  // ✅ JWT payload
  const payload = {
    username,
    role: isAdmin ? 'admin' : 'developer'
  };

  // ✅ Generate signed token
  const token = jwt.sign(payload, process.env.JWT_SEC, { expiresIn: '1h' });

  // ✅ Send cookie (secure + cross-site safe)
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  return res.json({
    success: true,
    message: `${username} logged in successfully`,
    role: payload.role
  });
};


/**
 * GET /auth/verify/admin
 * Verifies JWT from cookie
 */
export const VerifyAdmin = async (req, res) => {
  try {
    console.log('=== VERIFY ADMIN ===');
    console.log('All cookies:', req.cookies);
    console.log('Raw cookie header:', req.headers.cookie);
    
    const token = req.cookies.token;

    if (!token) {
      console.log('❌ No token in cookies');
      return res.status(401).json({ loggedIn: false, message: 'No token provided' });
    }

    console.log('✅ Token exists');
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    console.log('✅ Token valid:', decoded);

    return res.status(200).json({
      loggedIn: true,
      user: decoded
    });
  } catch (err) {
    console.error('❌ Verification error:', err.message);
    return res.status(401).json({ loggedIn: false, message: 'Invalid or expired token' });
  }
};


/**
 * POST /auth/logout/admin
 * Clears JWT cookie
 */
/**
* POST /auth/logout (not /auth/logout/admin)
* Clears JWT cookie
*/
export const LogoutAdmin = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/' // ⭐ Add this - must match the cookie path
    });

    return res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    });
  } catch (err) {
    console.error('Logout failed:', err.message);
    return res.status(500).json({ message: 'Logout failed' });
  }
};