const express = require('express');
const multer = require('multer');
const db = require('../db');

const router = express.Router();
const upload = multer({ dest: 'public/images/' });

// Route to display the "Add Game" form
router.get('/add', (req, res) => {
    res.render('add-game');
});

router.post('/add', upload.single('image'), (req, res) => {
    const { name, description, minPlayers, maxPlayers } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : null;

    const query = `
        INSERT INTO BoardGames (Name, Description, MinPlayers, MaxPlayers, ImagePath)
        VALUES (?, ?, ?, ?, ?);
    `;
    db.query(query, [name, description, minPlayers, maxPlayers, imagePath], (err) => {
        if (err) return res.status(500).send('Error adding game');
        res.redirect('/');
    });
});

// Route to display the "Edit Game" form
router.get('/edit/:id', (req, res) => {
    const query = `SELECT * FROM BoardGames WHERE GameID = ?;`;
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Database Error');
        if (results.length === 0) return res.status(404).send('Game not found');
        res.render('edit-game', { game: results[0] });
    });
});

router.post('/edit/:id', upload.single('image'), (req, res) => {
    const { name, description, minPlayers, maxPlayers } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : req.body.existingImagePath;

    const query = `
        UPDATE BoardGames
        SET Name = ?, Description = ?, MinPlayers = ?, MaxPlayers = ?, ImagePath = ?
        WHERE GameID = ?;
    `;
    db.query(query, [name, description, minPlayers, maxPlayers, imagePath, req.params.id], (err) => {
        if (err) return res.status(500).send('Error updating game');
        res.redirect('/');
    });
});

module.exports = router;
