import { isValidObjectId, Types } from "mongoose";
import request, { Response } from "supertest";
import { app } from "../../app";
import { sampleCookie, sampleTicket } from "../../constants/sample-test-data";
import { saveTicketHelper } from "../../test/save-ticket-helper";

const endpoint: string = '/api/tickets';

it(`Must has a route handler to ${endpoint} for get tickets`, (done) => {
  request(app)
    .get(endpoint)
    .set('Cookie', sampleCookie)
    .end((err: any, res: Response): void => {
      expect(res.statusCode).not.toEqual(404);

      done();
    });
});

it('Must send tickets if correct session was present', (done) => {
  saveTicketHelper()
    .then((response: Response): void => {
      request(app)
        .get(endpoint)
        .set('Cookie', sampleCookie)
        .end((err: any, res: Response): void => {
          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual('object');
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBeGreaterThanOrEqual(1)


          for (let ticket of res.body) {
            expect(ticket).toHaveProperty('id');
            expect(isValidObjectId(ticket.id)).toBeTruthy();
            expect(ticket).toHaveProperty('userId');
            expect(ticket.userId).toEqual(response.body.userId);
            expect(ticket).toHaveProperty('title');
            expect(ticket.title).toEqual(sampleTicket.title);
            expect(ticket).toHaveProperty('price');
            expect(ticket.price).toEqual(sampleTicket.price);
          }


          done();
        });
    });
});