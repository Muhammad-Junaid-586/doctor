import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Login again" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token. Login again" });
    }

    // req.body.userId = req.body.userId || req.userId;

// let userId = req.body.userId || req.userId;

// Now use `userId` consistently throughout your code

    req.body.userId  = decoded.id; // ✅ attach user id to request
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
const authUserForProfile = async (req, res, next) => {
  try {
    const token = req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Login again" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token. Login again" });
    }

    // req.body.userId = req.body.userId || req.userId;

// let userId = req.body.userId || req.userId;

// Now use `userId` consistently throughout your code

    req.userId  = decoded.id; // ✅ attach user id to request
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export { authUserForProfile };
export default authUser;
