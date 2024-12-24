const db = require('../db');

module.exports = {
    getList: async (req, res) => {
        try {
            const games = await db.query('SELECT * FROM games');
            res.render('games-list.ejs', {
                title: 'Board Games | Games List',
                games
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    },
    getAdd: (req, res) => {
        res.render('add-game.ejs', {
            title: 'Board Games | Add Game'
        });
    },
    getEdit: async (req, res) => {
        let id = req.params.id;
        try {
            const [game] = await db.query('SELECT * FROM games WHERE id = ?', [id]);
            if (game) {
                res.render('edit-game.ejs', {
                    title: 'Board Games | Edit Game',
                    game
                });
            } else {
                res.status(404).send('Game not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    },
    postAdd: async (req, res) => {
        const { name, description, category, min_players, max_players, playtime, image_url } = req.body;
        try {
            await db.query(
                'INSERT INTO games (name, description, category, min_players, max_players, playtime, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, description, category, min_players, max_players, playtime, image_url]
            );
            res.redirect('/games');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error adding game');
        }
    },
    postEdit: async (req, res) => {
        let id = req.params.id;
        const { name, description, category, min_players, max_players, playtime, image_url } = req.body;
        try {
            await db.query(
                'UPDATE games SET name = ?, description = ?, category = ?, min_players = ?, max_players = ?, playtime = ?, image_url = ? WHERE id = ?',
                [name, description, category, min_players, max_players, playtime, image_url, id]
            );
            res.redirect('/games');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error updating game');
        }
    },
    getRandomGame: async (req, res) => {
        try {
            const [game] = await db.query('SELECT * FROM games ORDER BY RAND() LIMIT 1');
            res.render('random-game.ejs', {
                title: 'Board Games | Random Game',
                game
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching random game');
        }
    }
};
