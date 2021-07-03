const client = require('../database.js');

const extraRunss = async () => {
  const extraRuns = `SELECT tt.name,SUM(extra_runs)
    FROM deliveriestable as dt
    INNER JOIN teamtable as tt
    ON tt.team_id = cast(dt.bowling_team as int)
    WHERE matchid 
    IN (SELECT id FROM matchestable
    WHERE season
    IN (SELECT season_id FROM seasontable WHERE year = '2016')
    )
    GROUP BY tt.name`;

  const runsData = await client.query(extraRuns).catch((err) => {
    console.log(err);
  });
  try {
    console.table(runsData.rows);
  } catch (error) {
    console.log(error);
  }

  return runsData.rows;
};

module.exports = extraRunss;
