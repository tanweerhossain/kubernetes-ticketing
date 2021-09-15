import { body, ValidationChain } from "express-validator";

export const saveOrderValidator: ValidationChain[] = [
  body('ticketId')
    .trim()
    .notEmpty()
    .withMessage('Ticket id is required')
    .isMongoId()
    .withMessage('Ticket id is invalid')
];