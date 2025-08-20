import { expressjwt as jwt } from 'express-jwt';
import jwks from 'jwks-rsa';

// Auth0 JWT verification middleware
const authAuth0 = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
  getToken: function fromHeaderOrQuerystring (req) {
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies (fallback)
    else if (req.cookies && req.cookies.auth0_token) {
      return req.cookies.auth0_token;
    }
    return null;
  }
});

export default authAuth0;
