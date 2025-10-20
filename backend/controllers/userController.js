import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js"; // make sure the path is correct
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import razorpay from "razorpay";

// Register User API
 const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details Please fill all the fields" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      date: Date.now(),
    });

   const user =  await newUser.save();
    const token =  jwt.sign({id :   user._id }, process.env.JWT_SECRET);

    // Send response
    console.log(user);
    
    res.json({
      success: true,
      message: "User registered successfully",
      user: { name, email },
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ success: true, token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Api to get user profile
const getProfile = async (req , res) => {
  try {
    
    // const {userId} = req.body;
    const user = await userModel.findById(req.userId ).select(["-password"]);
    res.json({ success: true, message: "User Profile fetched successfully", user });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message  });
    
  }
}


// Api to update  user profile
const updateProfile = async (req, res) => {
  try {
    const { name, dob, phone, address, gender } = req.body;
    const imageFile = req.file;

    // ✅ Log for debugging
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!name || !dob || !phone || !address || !gender) {
      return res.json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ✅ Parse address safely
    let parsedAddress;
    try {
      parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
    } catch (err) {
      return res.json({
        success: false,
        message: "Invalid address format. Must be JSON.",
      });
    }

    let updateData = { name, dob, phone, address: parsedAddress, gender };

    // ✅ Upload image if provided
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    // ✅ Use userId from token or body (depending on your logic)
    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId || userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found." });
    }

    res.json({
      success: true,
      message: "User profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Api for booking an appointment
const bookAppoinment = async (req, res) => {
  try {
  const { userId, docId, slotDate, slotTime } = req.body;

  // ✅ Fetch doctor data (excluding password)
  const docData = await doctorModel.findById(docId).select("-password");

  if (!docData.available) {
    return res.json({ success: false, message: "Doctor not available" });
  }

  // ✅ Get current booked slots
  let slots_booked = docData.slots_booked;

  // ✅ Check for slot availability
  if (slots_booked[slotDate]) {
    // If the date exists, check if the specific time slot is already taken
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    } else {
      // Otherwise, book this new slot
      slots_booked[slotDate].push(slotTime);
    }
  } else {
    // If no slots booked on that date yet, create an array for that date
    slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);
  }

 
 const userData =  await userModel.findById(req.userId || userId).select("-password");

 delete docData.slots_booked;
 const appointmentData = {
   userId,
   docId,
   slotDate,
   slotTime,
   userData,
   docData,
   amount: docData.fees,
   date: Date.now(),
  
   
 }

  const appointment = new appointmentModel(appointmentData);
  await appointment.save();

  // ✅ Update doctor slots_booked
  await doctorModel.findByIdAndUpdate(docId, { slots_booked });

  // ✅ You can also create a new appointment record here if needed
  res.json({ success: true, message: "Appointment booked successfully" });

} catch (error) {
  console.error(error);
  res.json({ success: false, message: error.message });
}

};


// Api to get user appoinment for the frontend my-appointments page
const listAppointments = async (req, res) => {
  try {
    
    const appointments = await appointmentModel.find({ userId: req.userId });
    res.json({ success: true, message: "Appointments fetched successfully", appointments });
  } catch (error) {
    console.error(error);
  res.json({ success: false, message: error.message });
  }
}


// Api to cancel the appointment
const cancelAppoinment = async (req, res) => {
  try {
    
    const { appointmentId } = req.body;
    const userId = req.userId;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appoinment data
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "You are not authorized to cancel this appoinment" });
    }

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

// Api to make payment of the appoinment using razorpay
const paymentRazorpay = async (params) => {
  
}


export { registerUser, loginUser , getProfile  , updateProfile , bookAppoinment , listAppointments , cancelAppoinment};