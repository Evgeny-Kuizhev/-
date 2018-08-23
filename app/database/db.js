'use strict';

const
    sqlite3 = require('sqlite3').verbose(),
    Promise  = require('bluebird'),
    seed = require('./seed');
    const db = Promise.promisifyAll( new  sqlite3.Database(__dirname+'/db.sqlite'));

db.serialize( async () => {
    const isResetDB = 1;
    if (isResetDB) {
        const
            DBMigrate = require('db-migrate'),
            dbmigrate = Promise.promisifyAll( DBMigrate.getInstance(true, {cwd: __dirname}) );
        await dbmigrate.resetAsync();
        await dbmigrate.upAsync();
    }

    db.run('PRAGMA foreign_keys=on');

    db.get('PRAGMA foreign_keys', (err, res) => {
        if (err) throw err;
        console.log('Default PRAGMA switched to ' + res.foreign_keys);
    });
    db.serialize( () => seed(db) );
});

module.exports = db;