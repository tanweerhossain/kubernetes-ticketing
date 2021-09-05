import request, { Response } from 'supertest';

import { app } from '../../app';
import { sampleUserData1 } from '../../constants/sample-data';
import { signUp } from '../../test/signup-helper';

const endpoint: string = '/api/users/signup';

it('Return 201 on successful signup', (done) => {
  request(app)
    .post(endpoint)
    .send(sampleUserData1)
    .expect(201)
    .end((err: any, res: Response): void => {
      expect(typeof res.body).toEqual('object');
      expect(Object.keys(res.body)).toHaveLength(0);

      done();
    });
});

it('Return 400 with invalid email', (done) => {
  request(app)
    .post(endpoint)
    .send({
      ...sampleUserData1,
      email: '24234nbvb'
    })
    .expect(400)
    .end((err: any, res: Response): void => {
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toBeTruthy();
      expect(res.body.errors).not.toHaveLength(0);

      for (const error of res.body.errors) {
        expect(typeof error).toEqual('object');
        expect(error).toHaveProperty('field');
        expect(error).toHaveProperty('message');
      }

      done();
    });
});

it('Return 400 with invalid password', (done) => {
  request(app)
    .post(endpoint)
    .send({
      ...sampleUserData1,
      password: '1'
    })
    .expect(400)
    .end((err: any, res: Response): void => {
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toBeTruthy();
      expect(res.body.errors.length).toBeGreaterThanOrEqual(1);

      for (const error of res.body.errors) {
        expect(typeof error).toEqual('object');
        expect(error).toHaveProperty('field');
        expect(error).toHaveProperty('message');
      }

      done();
    });
});

it('Return 400 with duplicate email', (done) => {
  signUp()
    .then((): void => {
      request(app)
        .post(endpoint)
        .send(sampleUserData1)
        .expect(400)
        .end((err: any, res: Response): void => {
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('errors');
          expect(Array.isArray(res.body.errors)).toBeTruthy();
          expect(res.body.errors.length).toBeGreaterThanOrEqual(1);

          for (const error of res.body.errors) {
            expect(typeof error).toEqual('object');
            expect(error).toHaveProperty('message');
          }

          done();
        });
    });

});