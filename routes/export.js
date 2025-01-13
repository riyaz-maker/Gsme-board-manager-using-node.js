const express = require('express');
const db = require('../db');
const { Parser } = require('json2csv');

const router = express.Router();

// Route to export analytics data as CSV
router.get('/export/csv', (req, res) => {
    const query = `
        SELECT 
            BoardGames.Name AS GameName, 
            COUNT(GameSessions.SessionID) AS SessionCount,
            COALESCE(MAX(GameSessions.SessionDate), 'Never') AS LastPlayed
        FROM 
            BoardGames
        LEFT JOIN 
            GameSessions 
        ON 
            BoardGames.GameID = GameSessions.GameID
        GROUP BY 
            BoardGames.GameID
        ORDER BY 
            SessionCount DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data for CSV export:', err);
            return res.status(500).send('Error exporting data');
        }

        // Use json2csv to convert data into CSV format
        const fields = ['GameName', 'SessionCount', 'LastPlayed'];
        const parser = new Parser({ fields });
        const csv = parser.parse(results);

        res.header('Content-Type', 'text/csv');
        res.attachment('analytics_data.csv');
        res.send(csv);
    });
});

module.exports = router;
