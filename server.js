'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    routes = require('./api/routes/'),

    passport = require('passport'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),

    app = express();


require('./authenticate').init();
// Конфигурация passport
app.use(session({
    store: new RedisStore({
        url: 'redis://localhost'
    }),
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// set the view engine to ejs
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(`${__dirname}/public`));

// enable logger
app.use(logger('dev'));
app.use(express.json());

// enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handlers routes
app.use('/', routes);
app.use('*', (req, res) => {
    res.status(404);
    res.render('not-found');
});

// starting server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;