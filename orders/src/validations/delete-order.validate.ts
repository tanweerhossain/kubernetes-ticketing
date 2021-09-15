import { body, param, ValidationChain } from "express-validator";

export const deleteOrderValidator: ValidationChain[] = [
  param('orderId')
    .trim()
    .notEmpty()
    .withMessage('Order Id is required')
    .isMongoId()
    .withMessage('Order Id is invalid')
];