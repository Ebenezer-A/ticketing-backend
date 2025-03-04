import Joi from "joi";

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: error.details.map((err) => err.message.replace(/["']/g, "")),
    });
  }
  next();
};

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot be longer than 30 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid("Admin", "User").required().messages({
    "any.only": "Role must be either 'Admin' or 'User'",
    "any.required": "Role is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

export const validateSignup = validateRequest(signupSchema);
export const validateLogin = validateRequest(loginSchema);
