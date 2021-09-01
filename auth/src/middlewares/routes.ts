import { Express } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { currentUserRouter } from '../routes/current-user';
import { signinRouter } from '../routes/signin';
import { signoutRouter } from '../routes/signout';
import { signupRouter } from '../routes/signup';
import { signupValidator } from '../validation/signup';

export const attachRoutes = (app: Express): void => {
  app.get('/api/users/currentuser', currentUserRouter);
  app.post('/api/users/signin', signinRouter);
  app.post('/api/users/signout', signoutRouter);
  app.post('/api/users/signup', signupValidator, signupRouter);
  app.all('/*', () => { throw new NotFoundError() });
};