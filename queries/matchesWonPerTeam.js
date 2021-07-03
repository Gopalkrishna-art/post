const client = require('../database.js');

const matchesWon = async () => {
  const matchesWonPerTeam = `SELECT seasondt.year, team.name,COUNT(team.team_id)
    FROM matchestable as matches
    JOIN seasontable as seasondt
    ON matches.season = seasondt.season_id
    JOIN teamtable as team
    ON matches.team1 = cast(team.team_id as varchar)
    GROUP BY seasondt.year,team.team_id
    ORDER BY seasondt.year
    `;
  const teamsWon = await client.query(matchesWonPerTeam).catch((err) => {
    console.log(err);
  });
  try {
    console.table(teamsWon.rows);
  } catch (error) {
    console.log(error);
  }

  return teamsWon.rows;
};

module.exports = matchesWon;
