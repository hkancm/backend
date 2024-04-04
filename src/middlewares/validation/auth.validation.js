const joi = require("joi");
const APIError = require("../../utils/errors");

class AuthValidation {
  constructor() {}

  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "Need string value!",
            "string.empty": "Name value cannot be empty",
            "string.min": "Name value minimum 3 characters ",
            "string.max": "Name value maximum 100 characters",
            "string.required": "Name value is required",
          }),
          lastName: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "Need string value!",
            "string.empty": "Last name value cannot be empty",
            "string.min": "Last name value minimum 3 characters ",
            "string.max": "Last name value maximum 100 characters",
            "string.required": "Last name value is required",
          }),
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "Need string value!",
              "string.empty": "Email value cannot be empty",
              "string.email": "It's not a email address",
              "string.min": "Email value minimum 3 characters ",
              "string.max": "Email value maximum 100 characters",
              "string.required": "Email value is required",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Need string value!",
            "string.empty": "password value cannot be empty",
            "string.min": "password value minimum 6 characters ",
            "string.max": "password value maximum 36 characters",
            "string.required": "password value is required",
          }),
          userName: joi.string().trim().max(36).required().messages({
            "string.base": "Need string value!",
            "string.empty": "UserName value cannot be empty",
            "string.max": "UserName value maximum 36 characters",
            "string.required": "UserName value is required",
          }),
          userType: joi.string().trim().max(36).required().messages({
            "string.base": "Need string value!",
            "string.empty": "UserType value cannot be empty",
            "string.max": "UserType value maximum 36 characters",
            "string.required": "UserType value is required",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      throw new APIError(error, 400);
    }
    next();
  };

  static login=async(req,res,next)=>{
    try {
      await joi
        .object({
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "Need string value!",
              "string.empty": "Email value cannot be empty",
              "string.email": "It's not a email address",
              "string.min": "Email value minimum 3 characters ",
              "string.max": "Email value maximum 100 characters",
              "string.required": "Email value is required",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Need string value!",
            "string.empty": "password value cannot be empty",
            "string.min": "password value minimum 6 characters ",
            "string.max": "password value maximum 36 characters",
            "string.required": "password value is required",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      throw new APIError(error, 400);
    }
    next()
  }
}

module.exports = AuthValidation;
