import { body, ValidationChain } from "express-validator";

export const signupValidator: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 4, max: 20 })
    .withMessage('Password is invalid')
];
