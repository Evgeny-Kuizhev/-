const
    Promise  = require('bluebird'),

    DBMigrate = require('db-migrate'),
    dbmigrate = DBMigrate.getInstance(true, {cwd: __dirname});

dbmigrate.reset( () => {
    dbmigrate.up();
})