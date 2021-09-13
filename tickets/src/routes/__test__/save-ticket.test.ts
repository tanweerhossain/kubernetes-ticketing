import request, { Response } from "supertest";
import { app } from "../../app";
import { sampleCookie, sampleTicket } from "../../constants/sample-test-data";
import { natsWrapper } from "../../middlewares/nats-wrapper";

const endpoint: string = '/api/tickets';

it(`Must has a route handler to ${endpoint} for post tickets`, (done) => {
  request(app)
    .post(endpoint)
    .send({})
    .end((err: any, res: Response): void => {
      expect(res.statusCode).not.toEqual(404);

      done();
    });
});

it('Must be authorized', (done) => {
  request(app)
    .post(endpoint)
    .send({})
    .end((err: any, res: Response): void => {
      expect(res.statusCode).toEqual(401);

      done();
    });
});

it('Must not send 401 response if authorized', (done) => {
  request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({})
    .end((err: any, res: Response): void => {
      expect(res.statusCode).not.toEqual(401);

      done();
    });
});

it('Returns 400 error response if invalid title was provided', (done) => {
  request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({
      title: '',
      price: 10
    })
    .end((err: any, res: Response) => {
      expect(res.statusCode).toEqual(400);

      done();
    });

});

it('Returns 400 error response if title is missing', (done) => {
  request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({
      price: 10
    })
    .end((err: any, res: Response) => {
      expect(res.statusCode).toEqual(400);

      done();
    });

});

it('Returns 400 error response if invalid price was provided', (done) => {
  request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({
      title: 'Item1',
      price: -10
    })
    .end((err: any, res: Response) => {
      expect(res.statusCode).toEqual(400);

      done();
    });

});

it('Returns 400 error response if price is missing', (done) => {
  request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({
      title: 'Item1'
    })
    .end((err: any, res: Response) => {
      expect(res.statusCode).toEqual(400);

      done();
    });

});



it('Returns 201 response if valid input was provided', (done) => {
  request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send(sampleTicket)
    .end((err: any, res: Response) => {
      expect(res.statusCode).toEqual(201);

      done();
    });

});

it('It publish an event if valid input was provided', (done) => {
  request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send(sampleTicket)
    .end((err: any, res: Response) => {
      expect(natsWrapper.client.publish).toHaveBeenCalled();

      done();
    });
});
