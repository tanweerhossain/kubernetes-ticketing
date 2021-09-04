import { body, ValidationChain } from "express-validator";

export const signupValidator: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Email is invalid'),
  body('password')
    .trim()
    .notEmpty()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password is invalid')
];