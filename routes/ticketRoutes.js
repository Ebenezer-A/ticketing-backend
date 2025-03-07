import express from "express";
import { authenticate, authorizedRoles } from "../config/authMiddleware.js";
import {
  addTicket,
  getTickets,
  updateTicket,
  getTicket,
} from "../controllers/ticketController.js";
import { validateTicket } from "../validators/ticketValidator.js";

const router = express.Router();

router.post("/add", authenticate, validateTicket, addTicket);
router.get("/get", authenticate, getTickets);
router.get("/get/:id", authenticate, getTicket);
router.put("/update/:id", authenticate, authorizedRoles("Admin"), updateTicket);

export default router;
