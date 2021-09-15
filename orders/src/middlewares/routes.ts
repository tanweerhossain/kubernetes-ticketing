import { Express } from 'express';
import { NotFoundError } from '@tanweerhossain/common';
import { authFilter } from '@tanweerhossain/common';
import { validateRequest } from '@tanweerhossain/common';
import { fetchOrdersRouter } from '../routes/fetch-orders';
import { saveOrderRouter } from '../routes/save-order';
import { deleteOrderRouter } from '../routes/delete-order';
import { showOrderRouter } from '../routes/show-order';
import { saveOrderValidator } from '../validations/save-order.validate';
import { deleteOrderValidator } from '../validations/delete-order.validate';
import { showOrderValidator } from '../validations/show-order.validate';

export const attachRoutes = (app: Express): void => {
  app.get('/api/orders', authFilter, fetchOrdersRouter);
  app.post('/api/orders', authFilter, saveOrderValidator, validateRequest, saveOrderRouter);
  app.delete('/api/orders/:orderId', authFilter, deleteOrderValidator, validateRequest, deleteOrderRouter);
  app.get('/api/orders/:orderId', authFilter, showOrderValidator, validateRequest, showOrderRouter);
  app.all('/*', () => { throw new NotFoundError() });
};