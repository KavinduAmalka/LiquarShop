// Get user profile from Auth0 token
export const getUserProfile = async (req, res) => {
  try {
    // req.user contains the decoded Auth0 token
    const auth0User = req.user;
    
    // Extract user information from Auth0 token
    const userProfile = {
      username: auth0User.sub, // Auth0 user ID (unique identifier)
      name: auth0User.name || auth0User.nickname || 'User',
      email: auth0User.email,
      contact: auth0User.phone_number || 'Not provided',
      country: auth0User['https://your-app.com/country'] || 'Not provided', // Custom claim
      picture: auth0User.picture || null
    };

    res.json({ 
      success: true, 
      user: userProfile,
      message: "User profile retrieved successfully" 
    });

  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve user profile" 
    });
  }
};

// Verify Auth0 token and get user info
export const verifyAuth0Token = async (req, res) => {
  try {
    // If middleware passed, token is valid
    res.json({ 
      success: true, 
      authenticated: true,
      user: req.user 
    });
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      authenticated: false,
      message: "Invalid token" 
    });
  }
};
