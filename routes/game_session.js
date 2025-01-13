const express = require('express');
const db = require('../db');

const router = express.Router();

// General route to display a form for selecting a game
router.get('/add', (req, res) => {
    const query = `SELECT GameID, Name FROM BoardGames ORDER BY Name ASC;`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching games for session addition:', err);
            return res.status(500).send('Database Error');
        }
        res.render('select-game-for-session', { games: results });
    });
});

// Route to display the "Add Session" form for a specific game
router.get('/add/:gameId', (req, res) => {
    const query = `SELECT * FROM BoardGames WHERE GameID = ?;`;
    db.query(query, [req.params.gameId], (err, results) => {
        if (err) return res.status(500).send('Database Error');
        if (results.length === 0) return res.status(404).send('Game not found');
        res.render('add-game-session', { game: results[0] });
    });
});

router.post('/add/:gameId', (req, res) => {
    const { sessionDate, startTime, endTime, notes } = req.body;

    const startDateTime = `${sessionDate} ${startTime}`;
    const endDateTime = `${sessionDate} ${endTime}`;

    const query = `
        INSERT INTO GameSessions (GameID, StartTime, EndTime, Notes)
        VALUES (?, ?, ?, ?);
    `;

    db.query(query, [req.params.gameId, startDateTime, endDateTime, notes], (err) => {
        if (err) return res.status(500).send('Error adding session');
        res.redirect('/');
    });
});

module.exports = router;
