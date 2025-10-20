import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// api for adding doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password,  speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;
   
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
     return res.json({ success: false, message: "All fields are required" });
    }
    
    if (!validator.isEmail(email)) {
     return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 6) {
     return res.json({ success: false, message: "Please enter a password with at least 8 characters" });
    }
      
    // hashing password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // uploading image to the cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type: "image"});
    const imageUrl = imageUpload.secure_url;
    
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address : JSON.parse(address),
      date : Date.now(),
    }
    
    // const doctor = await doctorModel.create(doctorData);
    const doctor = new doctorModel(doctorData);
    await doctor.save();

    
    res.json({ success: true, message: "Doctor added successfully", doctor });
    
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
    
  }

};

// api for login admin
const loginAdmin = async (req , res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      res.json({ success: true, message: "Admin logged in successfully", token });
      
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
    
  } catch (error) {
     console.log(error);
    res.json({ success: false, message: error.message  });
    
  }
}

const allDoctors = async (req , res) => {
  try {
    const doctors = await doctorModel.find({});
    res.json({ success: true, message: "Doctors fetched successfully", doctors });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
    
  }
}

const appointmentAdmin = async (req , res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({success : true , message : 'Appointments Fetch Successfully', appointments})
    
  } catch (error) {
    console.log(error);
    res.json({success : false , message : error.message})
    
  }
  
}

const adminAppointmentCancel = async (req, res) => {
  try {
    
    const { appointmentId } = req.body;
   
    const appointmentData = await appointmentModel.findById(appointmentId);

    
    

    await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled : true});
    // res.json({ success: true, message: "Appoinment cancelled successfully" });
      
    
    // releasing doctor slot
    const docId = appointmentData.docId;
    const doc = await doctorModel.findById(docId);
    const slots_booked = doc.slots_booked;
    const slotDate = appointmentData.slotDate;
    const slotTime = appointmentData.slotTime;
    slots_booked[slotDate] = slots_booked[slotDate].filter((time) => time !== slotTime);
    await doctorModel.findByIdAndUpdate(docId , {slots_booked});
    res.json({ success: true, message: "Appoinment cancelled successfully" });
    
  } catch (error) {
    console.error(error);
  res.json({ success: false, message: error.message });
  }
}

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    };

    res.json({ success: true, dashData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { addDoctor , loginAdmin , allDoctors , appointmentAdmin , adminAppointmentCancel , adminDashboard} ;