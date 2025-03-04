import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Env vars validation error: ${error.message}`);
}

export const PORT = value.PORT;
export const MONGO_URI = value.MONGO_URI;
export const JWT_SECRET = value.JWT_SECRET;
