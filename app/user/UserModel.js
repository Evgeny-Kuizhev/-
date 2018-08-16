'use strict';

const db = require('../database/db');


class User {

    static async getAll(cb) {
        let error = null,
            sql = 'SELECT * FROM User',
            users = await db.allAsync(sql).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, users);
    }

    static async getOne(userId, cb) {
        let error = null,
            sql = 'SELECT * FROM User WHERE id=?',
            user = await db.getAsync(sql, userId).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, user);
    }

    static async getNotes(userId, cb) {
        let error = null,
            sql = 'SELECT * FROM Note WHERE user_id=?',
            notes = await db.allAsync(sql, userId).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, notes);
    }

    static async create(username, email, password, phone=null, birthday=null, cb) {
        let error = null,
            sql =`INSERT INTO User (username, email, password, phone, birthday) VALUES
                    ((?), (?), (?), (?), (?))`,
            params = [username, email, password, phone, birthday];
        await db.runAsync(sql, params).catch(err => { error=err; });

        if (error) cb(error, null);
        else cb(null, {username, email, phone, birthday});
    }

    static async update(updateFields, userId, cb) {
        let [colomns, values] = [ '', [] ];
        for (let colomn in updateFields) {
            colomns += `${colomn} = (?),`;
            values.push(updateFields[colomn]);
        }
        colomns = colomns.slice(0, -1);
        let error = null,
            sql =`UPDATE User SET ${colomns} WHERE id=(?)`;
        await db.runAsync(sql, [...values, userId]).catch(err => { error=err; });
        if (error) cb(error, null);
        else cb(null, updateFields);
    }

    static async delete(userId, cb) {
        let error = null,
            sql =`DELETE FROM User WHERE id=(?)`;
        await db.runAsync(sql, [userId]).catch(err => { error=err; });
        if (error) cb(error, null);
        else cb(null, {userId});
    }
}


module.exports = User;