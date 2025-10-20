import express from 'express';
import { registerUser, loginUser, getProfile , updateProfile , bookAppoinment, listAppointments, cancelAppoinment } from '../controllers/userController.js';
import authUser  from '../middlewares/authUser.js';
import { authUserForProfile } from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile',authUserForProfile, getProfile)
// userRouter.post('/update-profile' ,upload.single('image'),authUser, updateProfile)
userRouter.post('/update-profile' ,upload.single('image'),authUserForProfile, updateProfile)
userRouter.post('/book-appointment' ,authUser, bookAppoinment)
userRouter.get('/appointments' ,authUserForProfile, listAppointments)
userRouter.post('/cancel-appointment' ,authUserForProfile, cancelAppoinment)
export default userRouter;