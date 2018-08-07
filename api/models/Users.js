'use strict'

const db = require('../../database/db');


class Users {

    static async getAll(cb) {
        let sql = 'SELECT * FROM User',
            users = await db.allAsync(sql).catch(cb);
        cb(null, users);
    }

    static async getOne(id, cb) {
        let sql = 'SELECT * FROM User WHERE id=?',
            user = await db.getAsync(sql, id).catch(cb);
        cb(null, user);
    }

    static async getUserNotes(id, cb) {
        let sql = 'SELECT * FROM Note WHERE user_id=?',
            notes = await db.allAsync(sql, id).catch(cb);
            cb(null, notes);
    }
}


module.exports = Users;