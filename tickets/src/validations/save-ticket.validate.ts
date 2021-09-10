import { body, ValidationChain } from "express-validator";

export const saveTicketValidator: ValidationChain[] = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1 })
    .withMessage('Title is invalid'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ gt: 0 })
    .withMessage('Price is invalid')
];