import express from "express";
import userRoutes from "../routes/userRoutes.js";
import ticketRoutes from "../routes/ticketRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/ticket", ticketRoutes);

export default router;
