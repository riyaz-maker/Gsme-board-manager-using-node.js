const db = require('../db');

module.exports = {
    getList: async (req, res) => {
        try {
            const users = await db.query('SELECT * FROM users');
            res.render('users-list.ejs', {
                title: 'Board Games | User List',
                users
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    },
    getFavorites: async (req, res) => {
        const { userId } = req.params;
        try {
            const favorites = await db.query(
                'SELECT g.* FROM favorites f JOIN games g ON f.game_id = g.id WHERE f.user_id = ?',
                [userId]
            );
            res.render('favorites-list.ejs', {
                title: 'Board Games | Favorite Games',
                favorites,
                userId
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    }
};
