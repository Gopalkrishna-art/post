const csv = require('csvtojson');
const { MATCHES_FILE_PATH, DELIVERIES_FILE_PATH } = require('./constants.js');

async function fetchData() {
  try {
    const matchesDataPromise = await csv().fromFile(MATCHES_FILE_PATH);
    const deliveriesDataPromise = await csv().fromFile(DELIVERIES_FILE_PATH);

    return [matchesDataPromise, deliveriesDataPromise];
  } catch (err) {
    console.log(err);
  }
}

module.exports = fetchData;
