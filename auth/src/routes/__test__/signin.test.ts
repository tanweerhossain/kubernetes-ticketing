import request, { Response } from 'supertest';

import { app } from '../../app';
import { sampleUserData1 } from '../../constants/sample-data';
import { signUp } from '../../test/signup-helper';

const endpoint: string = '/api/users/signin';

it('Return 400 on invalid signin', (done) => {
  signUp()
    .then((): void => {
      request(app)
        .post(endpoint)
        .send({
          ...sampleUserData1,
          password: 'rfegdfsdx'
        })
        .expect(400)
        .end((err: any, res: Response): void => {
          expect(res.get('Set-Cookie')).not.toBeDefined();

          done();
        });
    });
});

it('Return 200 on correct signin', (done) => {
  signUp()
    .then((): void => {
      request(app)
        .post(endpoint)
        .send(sampleUserData1)
        .expect(201)
        .end((err: any, res: Response): void => {
          expect(res.get('Set-Cookie')).toBeDefined();
          expect(Array.isArray(res.get('Set-Cookie'))).toBeTruthy();
          expect(res.get('Set-Cookie')).not.toHaveLength(0);

          done();
        });
    });
});