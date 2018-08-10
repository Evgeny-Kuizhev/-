'use strict'

const db = require('../../database/db');


class Note {

    static async getAll(cb) {
        let error = null,
            sql = 'SELECT * FROM Note',
            notes = await db.allAsync(sql).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, notes);
    }

    static async getOne(id, cb) {
        let error = null,
            sql = 'SELECT * FROM Note WHERE id=? LIMIT 1',
            note = await db.getAsync(sql, id).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, note);
    }

    static async getTags(id, cb) {
        let error = null,
            sql = `select Tag.* from Note_Tag
                    inner join Tag on Note_Tag.tag_id=Tag.id
                    where Note_Tag.note_id=?`,
            tags = await db.allAsync(sql, id).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, tags);
    }

    static async create(user_id, title, cb) {
        let error = null,
            sql =`INSERT INTO Note (user_id, title) VALUES
                    ((?), (?))`;
        await db.allAsync(sql, [user_id, title]).catch(err => { error = err; });
        if (error) cb(error, null);
        else cb(null, {user_id, title});
    }

    static async change (id, new_title, cb) {
        let error = null,
            sql =`UPDATE Note SET title = (?) WHERE id=(?)`;
        await db.runAsync(sql, [new_title, id]).catch(err => { error=err; });
        if (error) cb(error, null);
        else cb(null, {title: new_title});
    }

    static async delete(id, cb) {
        let error = null,
            sql =`DELETE FROM Note WHERE id=(?)`;
        await db.runAsync(sql, [id]).catch(err => { error=err; });
        if (error) cb(error, null);
        else cb(null, {id});
    }
}


module.exports = Note;