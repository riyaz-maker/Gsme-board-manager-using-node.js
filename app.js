const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { server } = require('./config');

const gameRoutes = require('./routes/game');
const gameSessionRoutes = require('./routes/game_session');
const analyticsRoutes = require('./routes/analytics');
const exportRoutes = require('./routes/export');
const { getHomePage } = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/games', gameRoutes);
app.use('/sessions', gameSessionRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/export', exportRoutes);
app.get('/', getHomePage);

// Export the app for testing
module.exports = app;

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(server.port, server.host, () => {
        console.log(`Server is running at http://${server.host}:${server.port}`);
    });
}
