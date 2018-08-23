'use strict';

const db = require('../database/db');

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

    static async create(title, noteId, cb) {
        let error = null,
            sqlGetTag = `select * from tag where title=(?)`,
            sqlCreateTag = `INSERT INTO Tag (title) VALUES ((?))`;

        let tag = await db.getAsync(sqlGetTag, title).catch(err => { error = err; });
        if (error) return cb(error);
        if (!tag) {
            await db.runAsync(sqlCreateTag, title).catch(err => { error = err; });
            tag = await db.getAsync(sqlGetTag, title).catch(err => { error = err; });
        }
        if (error) return cb(error);

        let sqlAddTagToNote = `insert into Note_Tag (note_id, tag_id) values ( (?), (?) )`;
        await db.runAsync(sqlAddTagToNote, [tag.id, noteId]).catch(err => { error = err; });
        if (error) cb(error, null);
        else cb(null, { title, noteId });
    }

    static async delete(tagId, noteId, cb) {
        let error = null,
            sql =`DELETE FROM Note_Tag WHERE tag_id=(?) AND note_id=(?)`;
        await db.runAsync(sql, [tagId, noteId]).catch(err => { error=err; });
        if (error) cb(error, null);
        else cb(null, {tagId, noteId});
    }
}


module.exports = Tag;