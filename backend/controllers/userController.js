import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Rejister a new user: /api/user/register
export const register = async (req, res)=> {
  try{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
      return res.json({success: false, message: "Please fill all the fields"});
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
      return res.json({success: false, message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({name, email, password: hashedPassword})

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

    res.cookie('token',token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
      path: '/', // Explicitly set path
      maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time (7 days)
    })

    return res.json({success: true, user: {email: user.email, name: user.name, cartItems: user.cartItems || {}}})

  }catch(error){
    console.error(error.message);
    res.json({success: false, message: error.message});
  }
}

// Login a user: /api/user/login

export const login = async (req, res) => {
  try{
     const {email, password} = req.body;

     if(!email || !password)
      return res.json({success: false, message: "Email and password are required"});
     const user = await User.findOne({email});

     if(!user){
      return res.json({success: false, message: "Invalid email or password"});
     }

     const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch)
        return res.json({success: false, message: "Invalid email or password"});
      
       const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

      res.cookie('token',token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
        path: '/', // Explicitly set path
        maxAge: 7 * 24 * 60 * 60 * 1000 
      })

      return res.json({success: true, user: {email: user.email, name: user.name, cartItems: user.cartItems || {}}})

  }catch(error){
    console.error(error.message);
    res.json({success: false, message: error.message});
  }
}

//Check Auth : /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
}

//Logout a user: /api/user/logout

export const logout = async (req, res) => {
  try {
   // Multiple cookie clearing strategies for maximum compatibility
   
   // Strategy 1: Clear with production settings
   res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    path: '/'
   });
   
   // Strategy 2: Clear with minimal settings
   res.clearCookie('token', {
    path: '/'
   });
   
   // Strategy 3: Clear without any options
   res.clearCookie('token');
   
   // Strategy 4: For production, try different domain variations
   if (process.env.NODE_ENV === 'production') {
     // Clear with secure settings
     res.clearCookie('token', {
       httpOnly: true,
       secure: true,
       sameSite: 'none',
       path: '/'
     });
     
     // Clear with different path variations
     res.clearCookie('token', { path: '/', domain: '' });
     res.clearCookie('token', { path: '/', domain: undefined });
   }
   
   // Set response headers to prevent caching
   res.set({
     'Cache-Control': 'no-cache, no-store, must-revalidate',
     'Pragma': 'no-cache',
     'Expires': '0'
   });
   
   return res.json({success: true, message: "Logged out successfully"});
  } catch (error) {
    console.error(error.message);
    res.json({success: false, message: error.message});
  }
}

// Force logout - clears cookies without requiring authentication
export const forceLogout = async (req, res) => {
  try {
    // Multiple cookie clearing strategies for maximum compatibility
    res.clearCookie('token', { path: '/' });
    res.clearCookie('token');
    res.clearCookie('token', { path: '/', domain: '' });
    res.clearCookie('token', { path: '/', secure: true, sameSite: 'none' });
    res.clearCookie('token', { path: '/', secure: false, sameSite: 'strict' });
    
    // Also clear seller token just in case
    res.clearCookie('sellerToken', { path: '/' });
    res.clearCookie('sellerToken');
    
    // Set response headers to prevent caching
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    return res.json({success: true, message: "Force logout completed"});
  } catch (error) {
    console.error(error.message);
    res.json({success: true, message: "Force logout completed"}); // Always return success
  }
}