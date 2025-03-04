import User from "../models/user/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/environments.js";

export const signupController = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();

    return res.status(202).json({
      message: "user created!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res, next) => {
  console.log("login", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ userId: user._id, token: `Bearer ${token}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
