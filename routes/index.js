const db = require('../db');

module.exports = {
    getHomepage: async (req, res) => {
        try {
            const games = await db.query(`
                SELECT g.id, g.name, g.description, g.image_url, MAX(s.date_played) AS last_played
                FROM games g
                LEFT JOIN sessions s ON g.id = s.game_id
                GROUP BY g.id, g.name, g.description, g.image_url;
            `);
            res.render('index.ejs', {
                title: 'Board Games | Home',
                games
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    }
};
