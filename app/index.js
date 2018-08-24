'use strict';

const
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    helmet = require('helmet'),

    passport = require('passport'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),

    app = express(),
    server = require('http').Server(app);


// security
app.use(helmet());

// enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./authenticate').init();

// Конфигурация passport
const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
    store: new RedisStore({
        url: 'redis://localhost'
    }),
    secret: 'my-secret',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        expires: expiryDate
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// set the view engine to ejs
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname),
    partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));

// enable logger
app.use(logger('dev'));
app.use(express.json());

// handlers routes
require('./user').init(app);
require('./note').init(app);
require('./tag').init(app);

app.use('*', (req, res) => {
    res.status(404);
    res.render('user/pages/notFound', {logged: req.isAuthenticated()});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// connect socket
require('./socket').init(server);


module.exports = server;