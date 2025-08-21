import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  console.log('Auth middleware - cookies received:', req.cookies);
  const {token} = req.cookies;

  if(!token){
    console.log('Auth middleware - no token found');
    return res.status(401).json({success: false, message: "Unauthorized access"});
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - token decoded:', { id: tokenDecoded.id });
    if (tokenDecoded.id) {
      req.user = tokenDecoded; // Attach decoded user info to req.user for all routes
      next();
    } else {
      console.log('Auth middleware - invalid token structure');
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }
  } catch (error) {
    console.log('Auth middleware - token verification failed:', error.message);
    return res.status(401).json({ success: false, message: error.message });
  }
}

export default authUser;