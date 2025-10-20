import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";




const changeAvailability = async (req, res) => {
  try {
    const {docId} = req.body;
    const doc = await doctorModel.findById(docId);
    const docData =   await doctorModel.findByIdAndUpdate(docId, {available: !doc.available});
    res.json({ success: true, message: "Availability changed successfully", docData });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
    
  }
}

const doctorList = async (req , res) => {
  try {

    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, message: "Doctors fetched successfully", doctors });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
  }
}



 const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if doctor exists
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET,
     
    );

    // Send success response
    res.json({
      success: true,
      message: "Login successful",
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        image: doctor.image,
        specialization: doctor.specialization,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get doctor appointments for the doctor panel
const doctorAppointments = async (req, res) => {
  try {
    // const {docId}  = req.body;
    const docId = req.docId;
    console.log(docId, "docId");
    
    
    
    const appointments = await appointmentModel.find({docId});
    res.json({ success: true, message: "Appointments fetched successfully", appointments });

    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
    
  }
};

// api for the completed  appointment of the doctor panel
const completedAppointments = async (req, res) => {
  try {
    const {  appointmentId} = req.body;
    const docId = req.docId;
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId , {isCompleted : true});
      res.json({ success: true, message: "Appoinment completed successfully" });
      
    } else {
      res.json({ success: false, message: "You are not authorized to complete this appoinment" });
      
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
    
  }
}

// api for the cancel  appointment of the doctor panel
const cancelAppointments = async (req, res) => {
  try {
    const {  appointmentId} = req.body;
    const docId = req.docId;
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled : true});
      res.json({ success: true, message: "Appoinment cancelled successfully" });
      
    } else {
      res.json({ success: false, message: "cancelation failed" });
      
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
    
  }
}

// Api to get the dashboard data for the doctor panel
const getDoctorDashboardData = async (req, res) => {
  try {
    
    const docId = req.docId;
    const appointments = await appointmentModel.find({docId});
   
    let earning = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount;
      }
    })

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    })
    const dashData = {
      earning: earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }

    res.json({ success: true, dashData });
   
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
    
  }
}


// Api to get Doctor Profile for the doctor panel
const doctorProfile = async (req , res) => {
  try {
    const docId = req.docId
    const doctorProfile = await doctorModel.findById(docId).select('-password');
    res.json({ success: true,  doctorProfile });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
    
  }
}

// Api to update Doctor Profile for the doctor panel
const updateDoctorProfile = async (req , res) => {
  try {
    const docId = req.docId
    const {name , fees , address , available} = req.body
    const updatedProfile = await doctorModel.findByIdAndUpdate(docId , {name , fees , address, available});
    res.json({ success: true,  updatedProfile });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
    
  }
}

export {changeAvailability, doctorList, loginDoctor , doctorAppointments ,
   completedAppointments , cancelAppointments , getDoctorDashboardData, doctorProfile , updateDoctorProfile};