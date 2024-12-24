const db = require('../db');

module.exports = {
    getMostPlayedGame: async (req, res) => {
        try {
            const [mostPlayed] = await db.query(`
                SELECT g.name, COUNT(s.id) AS session_count
                FROM games g
                JOIN sessions s ON g.id = s.game_id
                GROUP BY g.id
                ORDER BY session_count DESC
                LIMIT 1;
            `);
            res.render('statistics-most-played.ejs', {
                title: 'Board Games | Most Played Game',
                mostPlayed
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    },
    getLongestSession: async (req, res) => {
        try {
            const [longestSession] = await db.query(`
                SELECT g.name, s.date_played, MAX(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)) AS duration
                FROM games g
                JOIN sessions s ON g.id = s.game_id
                GROUP BY g.id
                ORDER BY duration DESC
                LIMIT 1;
            `);
            res.render('statistics-longest-session.ejs', {
                title: 'Board Games | Longest Game Session',
                longestSession
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    }
};
