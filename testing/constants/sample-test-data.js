const { getJWT } = require("@tanweerhossain/common");
const { Types } = require("mongoose");

exports.sampleCookie =
  `express:sess=${Buffer
    .from(
      JSON.stringify({
        jwt: getJWT({
          id: new Types.ObjectId().toHexString(),
          email: 'email1@domain.com'
        })
      })
    )
    .toString('base64')}`;

exports.sampleCookie2 =
  `express:sess=${Buffer
    .from(
      JSON.stringify({
        jwt: getJWT({
          id: new Types.ObjectId().toHexString(),
          email: 'email2@domain.com'
        })
      })
    )
    .toString('base64')}`;

exports.sampleTicket = {
  title: 'Item1',
  price: 5
};

exports.sampleTicket2 = {
  title: 'Item2',
  price: 20
};