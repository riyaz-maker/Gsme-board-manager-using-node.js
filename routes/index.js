const db = require('../db');

module.exports = {
    getHomePage: (req, res) => {
        let query = `
            SELECT 
                BoardGames.GameID,
                BoardGames.Name,
                BoardGames.Description,
                BoardGames.MinPlayers,
                BoardGames.MaxPlayers,
                BoardGames.ImagePath,
                COALESCE(MAX(GameSessions.StartTime), 'Never') AS LastPlayed
            FROM 
                BoardGames
            LEFT JOIN 
                GameSessions 
            ON 
                BoardGames.GameID = GameSessions.GameID
            GROUP BY 
                BoardGames.GameID
            ORDER BY 
                BoardGames.Name ASC;
        `;

        db.query(query, (err, result) => {
            if (err) {
                console.error('Database Query Error:', err);
                return res.redirect('/');
            }
            res.render('index.ejs', {
                title: 'Board Games | View Games',
                games: result
            });
        });
    }
};
