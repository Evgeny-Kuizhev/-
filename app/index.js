'use strict';

const
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    routes = require('./routes/'),

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

// enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handlers routes
require('./user').init(app);

app.use((err, req, res, next) => {
    if (err.isServer) {
      return res.status(500).send('Something broke!');
    }
    return res.status(err.output.statusCode).json(err.output.payload);
  })

app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});

app.use('*', (req, res) => {
    res.status(404);
    res.render('user/pages/notFound');
});


module.exports = app;