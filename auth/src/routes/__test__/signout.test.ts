import request from 'supertest';

import { app } from '../../app';
import { signInCookie } from '../../test/signin-helper';
import { signUp } from '../../test/signup-helper';

const endpoint: string = '/api/users/signout';

it('Return 401 on unsuccessful signout', (done) => {
  request(app)
    .post(endpoint)
    .expect(401)
    .then((): void => done());
});

it('Return 200 on successful signout', (done) => {
  signUp()
    .then(async ():
      Promise<void> => {
      const cookie:
        string[] = await signInCookie();

      request(app)
        .post(endpoint)
        .set('Cookie', cookie)
        .expect(200);
      done();
    });
});