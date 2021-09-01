import { body, ValidationChain } from "express-validator";

export const signupValidator: ValidationChain[] = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email is invalid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password is invalid')
];