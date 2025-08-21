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

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    };

    res.cookie('token', token, cookieOptions)

    return res.json({success: true, user: {email: user.email, name: user.name, cartItems: user.cartItems || {}}})

  }catch(error){
    console.error(error.message);
    res.json({success: false, message: error.message});
  }
}

// Login a user: /api/user/login

export const login = async (req, res) => {
  try{
     console.log('Login attempt:', { email: req.body.email, timestamp: new Date().toISOString() });
     
     const {email, password} = req.body;

     if(!email || !password)
      return res.json({success: false, message: "Email and password are required"});
     
     const user = await User.findOne({email});
     console.log('User found:', user ? 'Yes' : 'No');

     if(!user){
      return res.json({success: false, message: "Invalid email or password"});
     }

     const isMatch = await bcrypt.compare(password, user.password)
     console.log('Password match:', isMatch ? 'Yes' : 'No');

      if(!isMatch)
        return res.json({success: false, message: "Invalid email or password"});
      
       const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
       console.log('Token created, setting cookie...');

      const cookieOptions = {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/'
      };
      
      console.log('Setting cookie with options:', cookieOptions);
      
      res.cookie('token', token, cookieOptions);

      console.log('Login successful for user:', user.email);
      return res.json({success: true, user: {email: user.email, name: user.name, cartItems: user.cartItems || {}}})

  }catch(error){
    console.error('Login error:', error.message);
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
   console.log('Logout attempt - clearing cookies...', 'Environment:', process.env.NODE_ENV);
   
   // Get the domain from request headers for proper cookie clearing
   const origin = req.headers.origin;
   console.log('Request origin:', origin);
   
   // Clear cookie with multiple configurations to ensure it works in production
   const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    path: '/'
   };
   
   console.log('Cookie options for clearing:', cookieOptions);
   
   // Primary cookie clear
   res.clearCookie('token', cookieOptions);
   
   // Additional attempts with different configurations for cross-origin scenarios
   if (process.env.NODE_ENV === 'production') {
     // Try without sameSite
     res.clearCookie('token', {
       httpOnly: true,
       secure: true,
       path: '/'
     });
     
     // Try with lax sameSite
     res.clearCookie('token', {
       httpOnly: true,
       secure: true,
       sameSite: 'lax',
       path: '/'
     });
   }
   
   // Basic clear as fallback
   res.clearCookie('token');
   
   console.log('All cookie clear attempts completed');
   return res.json({success: true, message: "Logged out successfully"});
  } catch (error) {
    console.error('Logout error:', error.message);
    res.json({success: false, message: error.message});
  }
}