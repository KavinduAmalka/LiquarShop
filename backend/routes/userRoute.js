import express from 'express';
import { isAuth, login, logout, register, forceLogout } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/logout', authUser, logout)
userRouter.post('/force-logout', forceLogout) // No auth required for force logout

export default userRouter;