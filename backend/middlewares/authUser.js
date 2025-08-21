import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const {token} = req.cookies;

  if(!token){
    return res.status(401).json({success: false, message: "Unauthorized access"});
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecoded.id) {
      req.user = tokenDecoded; // Attach decoded user info to req.user for all routes
      next();
    } else {
      // Clear invalid cookie
      res.clearCookie('token', { path: '/' });
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }
  } catch (error) {
    // Clear invalid/expired cookie
    res.clearCookie('token', { path: '/' });
    res.clearCookie('token'); // Clear without options as fallback
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Token expired, please login again" });
    }
    
    return res.status(401).json({ success: false, message: "Invalid token, please login again" });
  }
}

export default authUser;