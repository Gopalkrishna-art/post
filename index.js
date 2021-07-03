const express = require('express');
const path = require('path');
const expHbs = require('express-handlebars');
const matchesPlayed = require('./queries/matchesPlayedPerTeam.js');
const matchesWon = require('./queries/matchesWonPerTeam.js');
const topBowlerss = require('./queries/topEconomicBowlers.js');
const logger = require('./logger.js');
const extraRunss = require('./queries/extraRuns.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(logger);

app.engine(
  'handlebars',
  expHbs({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

let matchesPlayedPer;
let matchesWonPerteam;
let extraRun2016;
let topEcomical;

(async function playedData() {
  matchesPlayedPer = await matchesPlayed();
})();
(async function wonData() {
  matchesWonPerteam = await matchesWon();
})();
(async function extraData() {
  extraRun2016 = await extraRunss();
})();
(async function topData() {
  topEcomical = await topBowlerss();
})();

app.get('/', (req, res) =>
  res.render('index', {
    matchesPlayedPer,
    matchesWonPerteam,
    extraRun2016,
    topEcomical,
  })
);
//  app.use(express.static(path.join(__dirname, '')));

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
