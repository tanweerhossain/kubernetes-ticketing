import { param, ValidationChain } from "express-validator";

export const showTicketValidator: ValidationChain[] = [
  param('ticketId')
    .trim()
    .notEmpty()
    .withMessage('Ticket Id is required')
    .isMongoId()
    .withMessage('Ticket Id is invalid')
];