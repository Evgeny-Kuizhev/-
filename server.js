const
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    Promise = require('bluebird'),
    routes = require('./routes/'),
    app = express(),

    sqlite3 = require('sqlite3').verbose(),
    db = new  sqlite3.Database('./db.sqlite', () =>  db.run('PRAGMA foreign_keys=on') );


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
app.use('*', (req, res) => res.render('not-found'));

// starting server
const PORT = 3000;

const seed = require('./seed');

db.serialize( async () => {
    db.get('PRAGMA foreign_keys', (err, res) => {
        if (err) throw err;
        console.log('Default PRAGMA switched to ' + res.foreign_keys);
    });

    //db.serialize( () => seed(db) );

    db.get('SELECT "SELECT" `SELECT`', (err, row) => {
        if (err) throw err;
        console.log('DB connected');
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    });
});
