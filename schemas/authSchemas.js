import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

export const authSignupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().required(),
  token: Joi.string(),
});

export const authLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});
