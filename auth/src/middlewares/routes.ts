import { Express } from 'express';
import { NotFoundError } from '../../../common/src/errors/not-found-error';
import { currentUserRouter } from '../routes/current-user';
import { signinRouter } from '../routes/signin';
import { signoutRouter } from '../routes/signout';
import { signupRouter } from '../routes/signup';
import { signinValidator } from '../validation/signin';
import { signupValidator } from '../validation/signup';
import { authFilter } from '@tanweerhossain/common';
import { validateRequest } from '@tanweerhossain/common';

export const attachRoutes = (app: Express): void => {
  app.get('/api/users/currentuser', authFilter, currentUserRouter);
  app.post('/api/users/signin', signinValidator, validateRequest, signinRouter);
  app.post('/api/users/signout', authFilter, signoutRouter);
  app.post('/api/users/signup', signupValidator, validateRequest, signupRouter);
  app.all('/*', () => { throw new NotFoundError() });
};