const db = require('../db');

module.exports = {
    getList: async (req, res) => {
        const { gameId } = req.params;
        try {
            const sessions = await db.query('SELECT * FROM sessions WHERE game_id = ?', [gameId]);
            res.render('sessions-list.ejs', {
                title: 'Board Games | Sessions List',
                sessions,
                gameId
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    },
    getAdd: (req, res) => {
        res.render('add-session.ejs', {
            title: 'Board Games | Add Session',
            gameId: req.params.gameId
        });
    },
    postAdd: async (req, res) => {
        const { gameId } = req.params;
        const { date_played, notes } = req.body;
        try {
            await db.query('INSERT INTO sessions (game_id, date_played, notes) VALUES (?, ?, ?)', [
                gameId,
                date_played,
                notes
            ]);
            res.redirect(`/sessions/${gameId}`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error adding session');
        }
    }
};
