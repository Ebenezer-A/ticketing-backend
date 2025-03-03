import mongoose from "mongoose";
import { MONGO_URI } from "./environments.js";

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDb connection successful");
  } catch (error) {
    console.log("Mongo connection failed");
    throw error;
  }
};

export default connectToDb;
