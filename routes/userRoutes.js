import express from "express";
import { validateLogin, validateSignup } from "../validators/userValidator.js";
import {
  loginController,
  signupController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", validateLogin, loginController);
router.post("/signup", validateSignup, signupController);

export default router;
