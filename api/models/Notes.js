'use strict'

const db = require('../../database/db');


class Notes {

    static async getAll(cb) {
        let sql = 'SELECT * FROM Note',
            notes = await db.allAsync(sql).catch(cb);
        cb(null, notes);
    }

    static async getOne(id, cb) {
        let sql = 'SELECT * FROM Note WHERE id=? LIMIT 1',
            note = await db.getAsync(sql, id).catch(cb);
        cb(null, note);
    }

    static async getTagNotes(id, cb) {
        let sql = `select Note.* from Note_Tag
                inner join Note on Note_Tag.note_id=Note.id
                where Note_Tag.tag_id=?`,
            notes = await db.getAsync(sql, id).catch(cb);
        cb(null, notes);
    }
}


module.exports = Notes;