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

// Set up view engine
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
app.use('/', exportRoutes);

// Home route
app.get('/', getHomePage);

// Start the server
app.listen(server.port, server.host, () => {
    console.log(`Server is running at http://${server.host}:${server.port}`);
});
