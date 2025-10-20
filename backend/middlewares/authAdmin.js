import jwt from "jsonwebtoken";

// admin authentication middleware

const authAdmin = async (req, res, next) => {
  try{
    const {atoken} = req.headers;
    if (!atoken) {
      return res.json({ success: false, message: "Not authorized Login again" });
      
    }
    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.json({ success: false, message: "Not authorized Login again" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Invalid token" }); 
  }
};

export default authAdmin;