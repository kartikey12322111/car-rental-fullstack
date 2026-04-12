import express from "express";
import { getCars, getUserData, loginUser, registerUser, forgotPassword, subscribeNewsletter } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/forgot-password', forgotPassword)
userRouter.get('/data', protect, getUserData)
userRouter.get('/cars', getCars)
userRouter.post('/subscribe', subscribeNewsletter)

export default userRouter;