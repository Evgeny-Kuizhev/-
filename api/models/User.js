'use strict'

const db = require('../../database/db');


class User {

    static async getAll(cb) {
        let error = null,
            sql = 'SELECT * FROM User',
            users = await db.allAsync(sql).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, users);
    }

    static async getOne(id, cb) {
        let error = null,
            sql = 'SELECT * FROM User WHERE id=?',
            user = await db.getAsync(sql, id).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, user);
    }

    static async getNotes(id, cb) {
        let error = null,
            sql = 'SELECT * FROM Note WHERE user_id=?',
            notes = await db.allAsync(sql, id).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, notes);
    }

    static async create(username, email, phone=null, birthday=null, cb) {
        let error = null,
            sql =`INSERT INTO User (username, email, phone, birthday) VALUES
                    ((?), (?), (?), (?))`,
            params = [username, email, phone, birthday];
        await db.runAsync(sql, params).catch(err => { error=err; });

        if (error) cb(error, null);
        else cb(null, {username, email, phone, birthday});
    }

    static async update(column, newValue, id, cb) {
        let error = null,
            sql =`UPDATE User SET ${column} = (?) WHERE id=(?)`;
        await db.runAsync(sql, [newValue, id]).catch(err => { error=err; });
        if (error) cb(error, null);
        else cb(null, {[column]: newValue});
    }
}


module.exports = User;