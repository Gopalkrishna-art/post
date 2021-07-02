const client = require('./database.js');
const fetchData = require('./ipl/fetchdata.js');
const {
  matchesFilePath,
  deliveriesFilePath
} = require('./ipl/constants.js');

const query = async () => {
  const [matches, deliveries] = await fetchData(matchesFilePath, deliveriesFilePath);
  console.log(matches[0], deliveries[0]);
  await client.connect();


  await client.query('DROP TABLE IF EXISTS seasonTable,cityTable,teamTable,umpireTable,matchesTable,deliveriesTable CASCADE')
  const matchesTable = `CREATE TABLE IF NOT EXISTS matchesTable (
    id INT PRIMARY KEY,
    season INT,
    city VARCHAR,
    date date,
    team1 VARCHAR, 
    team2 VARCHAR, 
    toss_winner VARCHAR, 
    toss_decision VARCHAR, 
    result VARCHAR, 
    dl_applied INT, 
    winner VARCHAR, 
    win_by_runs INT, 
    win_by_wickets INT, 
    player_of_the_match VARCHAR, 
    venue VARCHAR, 
    umpire1 VARCHAR, 
    umpire2 VARCHAR, 
    umpire3 VARCHAR
  )
`;

  await client.query(matchesTable)
  for (match of matches) {
    await client.query(`INSERT INTO matchesTable VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18
                )`, [match.id, match.season, match.city, match.date, match.team1, match.team2, match.toss_winner, match.toss_decision, match.result,
      match.dl_applied, match.winner, match.win_by_runs, match.win_by_wickets, match.player_of_match, match.venue,
      match.umpire1, match.umpire2, match.umpire3
    ])
  }


  const deliveriesTable = `CREATE TABLE IF NOT EXISTS deliveriesTable (
    matchid INT, 
    inning INT, 
    batting_team VARCHAR, 
    bowling_team VARCHAR, 
    over INT, 
    ball INT, 
    batsman VARCHAR, 
    non_striker VARCHAR, 
    bowler VARCHAR, 
    is_super_over INT, 
    wide_runs INT, 
    bye_runs INT, 
    legbye_runs INT, 
    noball_runs INT, 
    penalty_runs INT, 
    batsman_runs INT, 
    extra_runs INT, 
    total_runs INT, 
    player_dismissed VARCHAR, 
    dismissal_kind VARCHAR, 
    fielder VARCHAR
  )
`;
  await client.query(deliveriesTable)
  for (match of deliveries) {

    await client.query(`INSERT INTO deliveriesTable VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,
                    $14,$15,$16,$17,$18,$19,$20,$21
                    )`, [match.match_id, match.inning, match.batting_team, match.bowling_team, match.over, match.ball, match.batsman,
      match.non_stricker, match.bowler,
      match.is_super_over, match.wide_runs, match.bye_runs, match.legbye_runs, match.noball_runs,
      match.penalty_runs, match.batsman_runs, match.extra_runs, match.total_runs, match.player_dismissed,
      match.dismissal_kind, match.fielder
    ])
  }

  const season = `CREATE TABLE IF NOT EXISTS seasonTable(season_id SERIAL primary key, year INT)`;
  await client.query(season)

  const city = `CREATE TABLE IF NOT EXISTS cityTable(city_id SERIAL primary key,name VARCHAR unique)`;
  await client.query(city)

  const team = `CREATE TABLE IF NOT EXISTS teamTable(team_id SERIAL primary key,name VARCHAR)`;
  await client.query(team)

  const umpire = `CREATE TABLE IF NOT EXISTS umpireTable(umpire_id SERIAL primary key, name VARCHAR)`;
  await client.query(umpire)

  const insertSeason = `INSERT INTO seasonTable(year) SELECT distinct(season) from matchesTable`;
  await client.query(insertSeason)

  const insertCity = `INSERT INTO cityTable(name)SELECT distinct(city) from matchesTable`;
  await client.query(insertCity)

  const insertTeam = `INSERT INTO teamTable(name)SELECT distinct(team1) from matchesTable`;
  await client.query(insertTeam)

  const insertUmpire = `INSERT INTO umpireTable(name)SELECT distinct(umpire1) from matchesTable`;
  await client.query(insertUmpire)



  const normaliseSeason = `UPDATE matchesTable set season=season_id from seasonTable where matchesTable.season=seasonTable.year;`;
  await client.query(normaliseSeason)

  const normaliseCity = `UPDATE matchesTable set city=city_id from cityTable where matchesTable.city=cityTable.name; `;
  await client.query(normaliseCity)

  const normaliseTeam = `UPDATE matchesTable set team1=team_id from teamTable where matchesTable.team1=teamTable.name;
      UPDATE matchesTable set toss_winner=team_id from teamTable where matchesTable.toss_winner=teamTable.name;
      UPDATE matchesTable set winner=team_id from teamTable where matchesTable.winner=teamTable.name;
      UPDATE matchesTable set team2=team_id from teamTable where matchesTable.team2=teamTable.name;`;
  await client.query(normaliseTeam)

  const normaliseUmpire = `UPDATE matchesTable set umpire1=umpire_id from umpireTable where matchesTable.umpire1=umpireTable.name;
      UPDATE matchesTable set umpire2=umpire_id from umpireTable where matchesTable.umpire2=umpireTable.name;`;
  await client.query(normaliseUmpire)

  const normalizeDeliveriesTable = `
      UPDATE deliveriesTable set batting_team=team_id from teamTable where deliveriesTable.batting_team=teamTable.name;
      UPDATE deliveriesTable set bowling_team=team_id from teamTable where deliveriesTable.bowling_team=teamTable.name;`;
  await client.query(normalizeDeliveriesTable)


  client.end();
}
//query();
module.exports = {query}