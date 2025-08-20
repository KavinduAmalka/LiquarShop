import express from 'express';
import authAuth0 from '../middlewares/authAuth0.js';
import { getUserProfile, verifyAuth0Token } from '../controllers/auth0Controller.js';

const auth0Router = express.Router();

// Get user profile information (protected route)
auth0Router.get('/profile', authAuth0, getUserProfile);

// Verify if user is authenticated
auth0Router.get('/verify', authAuth0, verifyAuth0Token);

export default auth0Router;
