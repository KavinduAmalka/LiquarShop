import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const {token} = req.cookies;

  if(!token){
    return res.status(401).json({success: false, message: "Unauthorized access"});
  }

  try {
     const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
    if(tokenDecoded.id){
      if (!req.body) req.body = {};
      req.body.userID = tokenDecoded.id;
    }else{
      return res.status(401).json({success: false, message: "Unauthorized access"});
    }
     next();
  }catch(error){
    res.status(500).json({success: false, message: error.message});
  }
}

export default authUser;