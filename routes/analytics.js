const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
    // Query to fetch general analytics data
    const analyticsQuery = `
        SELECT 
            COUNT(*) AS TotalSessions,
            COUNT(DISTINCT GameID) AS TotalGames,
            (SELECT Name FROM BoardGames WHERE GameID = 
                (SELECT GameID FROM GameSessions GROUP BY GameID ORDER BY COUNT(*) DESC LIMIT 1)) AS MostPlayedGame,
            SUM(TIMESTAMPDIFF(MINUTE, StartTime, EndTime)) AS TotalMinutes
        FROM GameSessions;
    `;

    db.query(analyticsQuery, (analyticsErr, analyticsResults) => {
        if (analyticsErr) {
            console.error('Error fetching analytics data:', analyticsErr);
            return res.status(500).send('Error fetching analytics data');
        }

        res.render('analytics.ejs', {
            title: 'Session Analytics',
            analytics: analyticsResults[0]
        });
    });
});

module.exports = router;
