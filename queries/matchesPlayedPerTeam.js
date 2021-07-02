const client = require('../database.js');
const matchesPlayed = async () => {
    await client.connect();

    const matchesPlayedPerYear = `SELECT season.year,COUNT(season.year) as matchesPlayed
    FROM matchestable as matches
    JOIN seasontable as season
    ON matches.season = season.season_id
    GROUP BY season.year
        `
    const playedData = await client.query(matchesPlayedPerYear).catch((err) => {
        console.log(err);
    });
    try {
        console.table(playedData.rows);
    } catch (error) {
        console.log(error);
    }
    client.end();
    return playedData.rows;

}
// matchesPlayed();
module.exports = matchesPlayed