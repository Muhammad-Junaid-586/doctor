import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import  "dotenv/config"
import connectDB from "./config/mongodb.js"
// import connectDB from "./config/mongoDb"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"


const app = express();
const port = process.env.PORT || 5000;

connectDB(); 
connectCloudinary()

// middleware
app.use(express.json());
app.use(cors());


// api endpoints
app.use('/api/admin', adminRouter);
// localhost:5000/api/admin/add-doctor
app.use('/api/doctor', doctorRouter);
// localhost:5000/api/doctor/list
app.use('/api/user', userRouter);
// localhost:5000/api/user/register

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})