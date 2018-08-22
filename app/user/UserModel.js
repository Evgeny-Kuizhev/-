'use strict';

const db = require('../database/db');

class User {
    static async getAll(cb) {
        let error = null,
            sql = 'SELECT id, username, email, phone, birthday, notes_count FROM User',
            users = await db.allAsync(sql).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, users);
    }

    static async getNotes(userId, cb) {
        let error = null,
            sql = 'SELECT * FROM Note WHERE user_id=?',
            notes = await db.allAsync(sql, userId).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, notes);
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