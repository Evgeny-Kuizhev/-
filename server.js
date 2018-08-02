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

async function main() {

}

main();

new Promise((resolve, reject) => {
    const seed = require('./seed');
    db.serialize( () => {
        db.get('PRAGMA foreign_keys', (err, res) => {
            console.log('default pragma switched to ' + res.foreign_keys);
        });
        seed(db);
        db.get('SELECT "SELECT" `SELECT`', (err, row) => {
            if (err) reject(err);
            console.log(row);
            resolve();
        });
    });
})
.then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})
.catch((err) => console.error(err))
