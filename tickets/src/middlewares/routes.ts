import { Express } from 'express';
import { NotFoundError } from '@tanweerhossain/common';
import { authFilter } from '@tanweerhossain/common';
import { validateRequest } from '@tanweerhossain/common';

import { saveTicketRouter } from '../routes/save-ticket';
import { saveTicketValidator } from '../validations/save-ticket.validate';
import { showTicketRouter } from '../routes/show-ticket';
import { showTicketValidator } from '../validations/show-ticket.validate';
import { fetchTicketsRouter } from '../routes/fetch-tickets';
import { updateTicketRouter } from '../routes/update-ticket';
import { updateTicketValidator } from '../validations/update-ticket.validate';

export const attachRoutes = (app: Express): void => {
  app.get('/api/tickets', authFilter, fetchTicketsRouter);
  app.post('/api/tickets', authFilter, saveTicketValidator, validateRequest, saveTicketRouter);
  app.put('/api/tickets/:ticketId', authFilter, updateTicketValidator, validateRequest, updateTicketRouter);
  app.get('/api/tickets/:ticketId', showTicketValidator, validateRequest, showTicketRouter);
  app.all('/*', () => { throw new NotFoundError() });
};