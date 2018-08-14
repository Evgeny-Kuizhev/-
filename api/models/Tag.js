'use strict';

const db = require('../../database/db');


class Tag {

    static async getAll(cb) {
        let error = null,
            sql = 'SELECT * FROM Tag',
            tags = await db.allAsync(sql).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, tags);
    }

    static async getNotes(tagId, cb) {
        let error = null,
            sql = `select Note.* from Note_Tag
                inner join Note on Note_Tag.note_id=Note.id
                where Note_Tag.tag_id=?`,
            notes = await db.allAsync(sql, tagId).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, notes);
    }

    static async create(title, cb) {
        let error = null,
            sql = `INSERT INTO Tag (title) VALUES ((?))`;
            await db.runAsync(sql, title).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, { title });
    }

    static async delete(tagId, cb) {
        let error = null,
            sql =`DELETE FROM Tag WHERE id=(?)`;
        await db.runAsync(sql, [tagId]).catch(err => { error=err; });
        if (error) cb(error, null);
        else cb(null, {tagId});
    }
}


module.exports = Tag;