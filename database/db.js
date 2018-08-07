'use strict'

const
    sqlite3 = require('sqlite3').verbose(),
    Promise  = require('bluebird'),
    db = Promise.promisifyAll( new  sqlite3.Database('database/db.sqlite', () =>  db.run('PRAGMA foreign_keys=on') ) ),
    seed = require('./seed');

db.serialize(() => {
    db.get('PRAGMA foreign_keys', (err, res) => {
        if (err) throw err;
        console.log('Default PRAGMA switched to ' + res.foreign_keys);
    });

    // use seed?
    // db.serialize( () => seed(db) );
});


module.exports = db;