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

    static async create(username, email, phone=null, birthday=null, cb) {
        let sql =
            `INSERT INTO User (username, email, phone, birthday) VALUES
            ((?), (?), (?), (?))`;

        await db.runAsync(sql, [username, email, phone, birthday]).catch(cb);
        cb(null, {username, email, phone, birthday});
    }
}


module.exports = Users;