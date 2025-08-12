

const authUser = (req, res, next) => {
  const {token} = req.cookies;

  if(!token){
    return res.status(401).json({success: false, message: "Unauthorized access"});
  }

  try {
     const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
     if(tokenDecoded.id){
        req.body.userID = tokenDecoded.id;
     }else{
        return res.status(401).json({success: false, message: "Unauthorized access"});
     }
     next();
  }catch(error){
    res.json({success: false, message: error.message});
  }
}

export default authUser;