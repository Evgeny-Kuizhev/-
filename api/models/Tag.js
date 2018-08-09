'use strict'

const db = require('../../database/db');


class Tag {

    static async getAll(cb) {
        let error = null,
            sql = 'SELECT * FROM Tag',
            tags = await db.allAsync(sql).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, tags);
    }

    static async getNoteTags(id, cb) {
        let error = null,
            sql = `select Tag.* from Note_Tag
                    inner join Tag on Note_Tag.tag_id=Tag.id
                    where Note_Tag.note_id=?`,
            tags = await db.allAsync(sql, id).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, tags);
    }

    static async create(title, cb) {
        let error = null,
            sql = `INSERT INTO Tag (title) VALUES ((?))`;
            await db.runAsync(sql, title).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, { title });
    }
}


module.exports = Tag;