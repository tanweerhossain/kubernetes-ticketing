import { isValidObjectId, Types } from "mongoose";
import request, { Response } from "supertest";
import { app } from "../../app";
import { sampleCookie, sampleCookie2, sampleTicket, sampleTicket2 } from "../../constants/sample-test-data";
import { saveTicketHelper } from "../../test/save-ticket-helper";

const endpoint: string = '/api/tickets/<ticketId>';

it(`Must has a route handler to ${endpoint} for get tickets`, (done) => {
  request(app)
    .put(endpoint.replace('<ticketId>', new Types.ObjectId().toHexString()))
    .set('Cookie', sampleCookie)
    .send({})
    .end((err: any, res: Response): void => {
      expect(res.statusCode).not.toEqual(404);

      done();
    });
});

it('Must be authorized', (done) => {
  request(app)
    .put(endpoint.replace('<ticketId>', new Types.ObjectId().toHexString()))
    .send({})
    .end((err: any, res: Response): void => {
      expect(res.statusCode).toEqual(401);

      done();
    });
});

it('Must return 400 response if ticket is not present in database', (done) => {
  request(app)
    .put(endpoint.replace('<ticketId>', new Types.ObjectId().toHexString()))
    .set('Cookie', sampleCookie)
    .send(sampleTicket)
    .end((err: any, res: Response): void => {
      expect(res.statusCode).toEqual(400);

      done();
    });
});

it('Must return 401 response if ticket id is of different user', (done) => {
  saveTicketHelper()
    .then((response: Response): void => {
      request(app)
        .put(endpoint.replace('<ticketId>', response.body.id))
        .set('Cookie', sampleCookie2)
        .send(sampleTicket)
        .end((err: any, res: Response): void => {
          expect(res.statusCode).toEqual(401);

          done();
        });
    });
});

it('Must return 400 response if ticket id is incorrect', (done) => {
  request(app)
    .put(endpoint.replace('<ticketId>', 'anything'))
    .set('Cookie', sampleCookie2)
    .send(sampleTicket)
    .end((err: any, res: Response): void => {
      expect(res.statusCode).toEqual(400);

      done();
    });
});

it('Must return 400 response if ticket title is missing', (done) => {
  saveTicketHelper()
    .then((response: Response): void => {
      request(app)
        .put(endpoint.replace('<ticketId>', response.body.id))
        .set('Cookie', sampleCookie)
        .send({
          ...sampleTicket,
          title: undefined
        })
        .end((err: any, res: Response): void => {
          expect(res.statusCode).toEqual(400);

          done();
        });
    });
});

it('Must return 400 response if ticket title is incorrect', (done) => {
  saveTicketHelper()
    .then((response: Response): void => {
      request(app)
        .put(endpoint.replace('<ticketId>', response.body.id))
        .set('Cookie', sampleCookie)
        .send({
          ...sampleTicket,
          title: ''
        })
        .end((err: any, res: Response): void => {
          expect(res.statusCode).toEqual(400);

          done();
        });
    });
});

it('Must return 400 response if ticket price is missing', (done) => {
  saveTicketHelper()
    .then((response: Response): void => {
      request(app)
        .put(endpoint.replace('<ticketId>', response.body.id))
        .set('Cookie', sampleCookie)
        .send({
          ...sampleTicket,
          price: undefined
        })
        .end((err: any, res: Response): void => {
          expect(res.statusCode).toEqual(400);

          done();
        });
    });
});

it('Must return 400 response if ticket price is incorrect', (done) => {
  saveTicketHelper()
    .then((response: Response): void => {
      request(app)
        .put(endpoint.replace('<ticketId>', response.body.id))
        .set('Cookie', sampleCookie)
        .send({
          ...sampleTicket,
          price: -1 * sampleTicket.price
        })
        .end((err: any, res: Response): void => {
          expect(res.statusCode).toEqual(400);

          done();
        });
    });
});

it('Must return 200 response if ticket data are correct', (done) => {
  saveTicketHelper()
    .then((response: Response): void => {
      request(app)
        .put(endpoint.replace('<ticketId>', response.body.id))
        .set('Cookie', sampleCookie)
        .send(sampleTicket2)
        .end((err: any, res: Response): void => {
          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('id');
          expect(res.body.id).toEqual(response.body.id);
          expect(res.body).toHaveProperty('userId');
          expect(res.body.userId).toEqual(response.body.userId);
          expect(res.body).toHaveProperty('title');
          expect(res.body.title).toEqual(sampleTicket2.title);
          expect(res.body).toHaveProperty('price');
          expect(res.body.price).toEqual(sampleTicket2.price);


          done();
        });
    });
});
