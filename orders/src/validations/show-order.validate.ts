import { param, ValidationChain } from "express-validator";

export const showOrderValidator: ValidationChain[] = [
  param('orderId')
    .trim()
    .notEmpty()
    .withMessage('Order Id is required')
    .isMongoId()
    .withMessage('Order Id is invalid')
];