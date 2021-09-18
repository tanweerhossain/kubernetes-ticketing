const axios = require('axios');
const { sampleTicket } = require('./constants/sample-test-data');

const hostURL = 'http://ticketing.dev';
const sampleCookie = `express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall4TkRNNFpHSTNOMlprTURKaU9HTmpaV1ZqWXpneU5pSXNJbVZ0WVdsc0lqb2lZV0pqUUdSdmJXRnBiaTVqYjIwaUxDSnBZWFFpT2pFMk16RTRNVGN4TkRoOS5BcEM3WkhRUTRMY25NcU9ZVG9saEdEUlFPbzhNUUZUMjY3N2hZTWU1Mmk4In0=`;


const createTicket = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: `${hostURL}/api/tickets`,
      data: JSON.stringify(sampleTicket),
      headers: {
        'Content-Type': 'application/json',
        'Cookie': sampleCookie
      }
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
};

const updateTicket = async (ticketId, callTime = 1) => {
  try {
    const response = await axios.put(`${hostURL}/api/tickets/${ticketId}`, {
      ...sampleTicket,
      price: sampleTicket.price + (5 * callTime)
    }, {
      headers: {
        'Cookie': sampleCookie
      }
    });

    return response.data;
  } catch (error) {
    return null;
  }
};

const aUnitOfTestingCycle = async (testIndex = 1) => {
  const response = await createTicket();
  console.log(`#${testIndex}`, response);
  await updateTicket(response.id);
  updateTicket(response.id, 2);
};

(function main() {
  Array(1000).fill(1).map((_, i) => {
    aUnitOfTestingCycle(i + 1);
  });
})()