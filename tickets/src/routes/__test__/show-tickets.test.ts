import { Types } from "mongoose";
import request, { Response } from "supertest";
import { app } from "../../app";
import { sampleTicket } from "../../constants/sample-test-data";
import { saveTicketHelper } from "../../test/save-ticket-helper";

const endpoint: string = '/api/tickets/<ticketId>';

it(`Must has a route handler to ${endpoint} for get tickets`, (done) => {
  request(app)
    .get(endpoint.replace('<ticketId>', new Types.ObjectId().toHexString()))
    .end((err: any, res: Response): void => {
      expect(res.statusCode).not.toEqual(404);

      done();
    });
});

it('Must send ticket if ticket id was found', (done) => {
  saveTicketHelper()
    .then((response: Response): void => {
      request(app)
        .get(endpoint.replace('<ticketId>', response.body.id))
        .end((err: any, res: Response): void => {
          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('id');
          expect(res.body.id).toEqual(response.body.id);
          expect(res.body).toHaveProperty('userId');
          expect(res.body.userId).toEqual(response.body.userId);
          expect(res.body).toHaveProperty('title');
          expect(res.body.title).toEqual(sampleTicket.title);
          expect(res.body).toHaveProperty('price');
          expect(res.body.price).toEqual(sampleTicket.price);

          done();
        });
    })

});