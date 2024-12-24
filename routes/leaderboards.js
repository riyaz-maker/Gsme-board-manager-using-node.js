const db = require('../db');

module.exports = {
    getLeaderboard: async (req, res) => {
        try {
            const leaderboard = await db.query(`
                SELECT u.username, SUM(sc.score) AS total_score
                FROM scores sc
                JOIN users u ON sc.user_id = u.id
                GROUP BY u.id
                ORDER BY total_score DESC
                LIMIT 10;
            `);
            res.render('leaderboard.ejs', {
                title: 'Board Games | Leaderboard',
                leaderboard
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    }
};
