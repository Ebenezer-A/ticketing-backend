import jwt from "jsonwebtoken";
import User from "../models/user/index.js";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = async (req, res, next) => {
  if (
    !req.headers.authorization &&
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(id);
    req.user = await User.findById(id);
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
