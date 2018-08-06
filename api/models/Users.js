'use strict'

const db = require('../../database/db');


class Users {

    static async getAll(cb) {
        let query = 'SELECT * FROM User',
            users = await db.allAsync(query);
        console.log('---------------------');
        console.log(users);
        cb(err, users);
    }

    static async getOne(id, cb) {
        let query = 'SELECT * FROM User WHERE id=? LIMIT 1',
            user = await db.getAsync(query, id);
        cb(null, user);
    }
}


module.exports = Users;