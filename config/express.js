import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Routes from "./routes.js";
import helmet from "helmet";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Routes);

export default app;
