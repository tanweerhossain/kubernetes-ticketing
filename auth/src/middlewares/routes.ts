import { Express } from 'express';
import { NotFoundError } from '@tanweerhossain/common';
import { authFilter } from '@tanweerhossain/common';
import { validateRequest } from '@tanweerhossain/common';

import { currentUserRouter } from '../routes/current-user';
import { signinRouter } from '../routes/signin';
import { signoutRouter } from '../routes/signout';
import { signupRouter } from '../routes/signup';
import { signinValidator } from '../validations/signin';
import { signupValidator } from '../validations/signup';

export const attachRoutes = (app: Express): void => {
  app.get('/api/users/currentuser', authFilter, currentUserRouter);
  app.post('/api/users/signin', signinValidator, validateRequest, signinRouter);
  app.post('/api/users/signout', authFilter, signoutRouter);
  app.post('/api/users/signup', signupValidator, validateRequest, signupRouter);
  app.all('/*', () => { throw new NotFoundError() });
};