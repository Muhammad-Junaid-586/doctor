import express from 'express';
import { doctorAppointments, doctorList, loginDoctor , completedAppointments , cancelAppointments, getDoctorDashboardData, doctorProfile, updateDoctorProfile } from '../controllers/doctorController.js';
import authDoctor, { authDoctorForProfile } from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();


doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctorForProfile, doctorAppointments)
doctorRouter.post('/complete-appointment', authDoctorForProfile, completedAppointments)
doctorRouter.post('/cancel-appointment', authDoctorForProfile, cancelAppointments)
doctorRouter.get('/dashboard', authDoctorForProfile, getDoctorDashboardData)
doctorRouter.get('/profile', authDoctorForProfile, doctorProfile)
doctorRouter.post('/update-profile', authDoctorForProfile, updateDoctorProfile)
export default doctorRouter