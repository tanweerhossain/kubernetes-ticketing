import { Express } from 'express';
import { authFilter, NotFoundError, validateRequest } from '@tanweerhossain/common';
import { verifyNSavePaymentRouter } from '../routes/verify-save-payment';
import { verifyNSavePaymentValidator } from '../validations/verify-save-payment.validation';


export const attachRoutes = (app: Express): void => {
  // app.get('/api/payments', authFilter, fetchTicketsRouter);
  app.post('/api/payments', authFilter, verifyNSavePaymentValidator, validateRequest, verifyNSavePaymentRouter);
  // app.put('/api/payments/:ticketId', authFilter, updateTicketValidator, validateRequest, updateTicketRouter);
  // app.get('/api/payments/:ticketId', showTicketValidator, validateRequest, showTicketRouter);
  app.all('/*', () => { throw new NotFoundError() });
};