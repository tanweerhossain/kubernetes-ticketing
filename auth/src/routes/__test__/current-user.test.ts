import { isValidObjectId } from 'mongoose';
import request, { Response, Test } from 'supertest';

import { app } from '../../app';
import { sampleUserData1 } from '../../constants/sample-data';
import { signInCookie } from '../../test/signin-helper';
import { signUp } from '../../test/signup-helper';

const endpoint: string = '/api/users/currentuser';

it('Return 401 on un-sessionized access', (done) => {
  request(app)
    .get(endpoint)
    .expect(401)
    .then((): void => done());
});

it('Return 200 on sessionized access', (done) => {
  signUp()
    .then(async (): Promise<void> => {
      const cookie:
        string[] = await signInCookie();

      request(app)
        .get(endpoint)
        .set('Cookie', cookie)
        .expect(200)
        .end((err: any, res: Response): void => {
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('currentUser');
          expect(res.body.currentUser).toBeInstanceOf(Object);
          expect(res.body.currentUser).toHaveProperty('id');
          expect(res.body.currentUser).toHaveProperty('email');
          expect(isValidObjectId(res.body.currentUser.id)).toBeTruthy();
          expect(res.body.currentUser.email).toEqual(sampleUserData1.email);

          done();
        });
    });
});