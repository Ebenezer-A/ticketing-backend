import Joi from "joi";

const ticketSchema = Joi.object({
  title: Joi.string().max(50).required().messages({
    "string.min": "Title must be at least 5 characters long",
    "string.max": "Title cannot be longer than 100 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().max(500).required().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot be longer than 500 characters",
    "any.required": "Description is required",
  }),
  status: Joi.string()
    .valid("Open", "In Progress", "Closed")
    .required()
    .messages({
      "any.only":
        "Status must be one of the following: Open, In Progress, Closed",
      "any.required": "Status is required",
    }),
});

export const validateTicket = (req, res, next) => {
  const { error } = ticketSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: error.details.map((err) => err.message.replace(/["']/g, "")),
    });
  }

  next();
};
