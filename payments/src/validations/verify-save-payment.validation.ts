import { body } from "express-validator";

export const verifyNSavePaymentValidator = [
  body('token')
    .notEmpty()
    .withMessage('Token is missing')
    .isString()
    .withMessage('Token is invalid'),
  body('orderId')
    .notEmpty()
    .withMessage('Order Id is missing')
    .isMongoId()
    .withMessage('Order Id is invalid')
];