import { Express } from 'express';
import { NotFoundError } from '@tanweerhossain/common';


export const attachRoutes = (app: Express): void => {
  // app.get('/api/payments', authFilter, fetchTicketsRouter);
  // app.post('/api/payments', authFilter, saveTicketValidator, validateRequest, saveTicketRouter);
  // app.put('/api/payments/:ticketId', authFilter, updateTicketValidator, validateRequest, updateTicketRouter);
  // app.get('/api/payments/:ticketId', showTicketValidator, validateRequest, showTicketRouter);
  app.all('/*', () => { throw new NotFoundError() });
};