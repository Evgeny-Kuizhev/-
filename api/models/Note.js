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

    static async getTagNotes(id, cb) {
        let error = null,
            sql = `select Note.* from Note_Tag
                inner join Note on Note_Tag.note_id=Note.id
                where Note_Tag.tag_id=?`,
            notes = await db.allAsync(sql, id).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, notes);
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
}


module.exports = Note;