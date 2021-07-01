const client = require('../database.js');
const topBowlerss = async () => {

   
    const topBowlers = ` select seasontable.year,deliveriestable.bowler,sum(deliveriestable.total_runs)*6/count(bowler) as economy 
    from matchestable 
    left join seasontable on matchestable.season = seasontable.season_id
    left join deliveriestable
    on matchestable.id = deliveriestable.matchid
    where seasontable.year=2015
    group by seasontable.year,deliveriestable.bowler
order by economy
LIMIT 10
`
   const topBowler = await client.query(topBowlers).catch((err) => {
        console.log(err);
    });
    try {
        console.table(topBowler.rows);
    } catch (error) {
        console.log(error);
    }
    return topBowler.rows;

}

module.exports=topBowlerss