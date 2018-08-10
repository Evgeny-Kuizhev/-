'use strict'

const db = require('../../database/db');


class Tags {

    static async getAll(cb) {
        let sql = 'SELECT * FROM Tag',
            tags = await db.allAsync(sql).catch(cb);
        cb(null, tags);
    }

    static async getNoteTags(id, cb) {
        let sql = `select Tag.* from Note_Tag
                inner join Tag on Note_Tag.tag_id=Tag.id
                where Note_Tag.note_id=?`,
            tags = await db.allAsync(sql, id).catch(cb);
        cb(null, tags);
    }
}


module.exports = Tags;