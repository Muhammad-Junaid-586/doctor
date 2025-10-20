import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const dtoken = req.headers.dtoken || req.headers.authorization?.split(" ")[1];

    if (!dtoken) {
      return res.status(401).json({ success: false, message: "Not authorized. Login again" });
    }

    // Decode token
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token. Login again" });
    }

    

    req.body.docId  = decoded.id; // ✅ attach user id to request
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
const authDoctorForProfile = async (req, res, next) => {
  try {
    const dtoken = req.headers.dtoken || req.headers.authorization?.split(" ")[1];

    if (!dtoken) {
      return res.status(401).json({ success: false, message: "Not authorized. Login again" });
    }

    // Decode token
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token. Login again" });
    }

    

    req.docId  = decoded.id; // ✅ attach user id to request
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export { authDoctorForProfile };
export default authDoctor;
