const mysql = require('mysql');
const { database } = require('./config');
const db = mysql.createPool(database);

db.getConnection((err, connection) => {
    if (err) {
        switch (err.code) {
            case 'ER_ACCESS_DENIED_ERROR':
                console.error('Database access denied: Check your username and password.');
                break;
            case 'ER_BAD_DB_ERROR':
                console.error('Database not found: Ensure the database name is correct.');
                break;
            case 'ECONNREFUSED':
                console.error('Database connection refused: Check if the database server is running.');
                break;
            default:
                console.error('Error connecting to the database:', err.message);
        }
    } else {
        console.log('Connected to the database successfully!');
        connection.release();
    }
});

module.exports = db;
