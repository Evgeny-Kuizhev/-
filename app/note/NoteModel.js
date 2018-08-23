'use strict';

const db = require('../database/db');

class Note {
    static async getAll(cb) {
        let error = null,
            sql = 'SELECT * FROM Note',
            notes = await db.allAsync(sql).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, notes);
    }

    static async getOne(noteId, cb) {
        let error = null,
            sql = 'SELECT * FROM Note WHERE id=? LIMIT 1',
            note = await db.getAsync(sql, noteId).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, note);
    }

    static async getTags(noteId, cb) {
        let error = null,
            sql = `select Tag.* from Note_Tag
                    inner join Tag on Note_Tag.tag_id=Tag.id
                    where Note_Tag.note_id=?`,
            tags = await db.allAsync(sql, noteId).catch(err => { error = err; });

        if (error) cb(error, null);
        else cb(null, tags);
    }

    static async create(userId, title, cb) {
        let error = null,
            sql =`INSERT INTO Note (user_id, title) VALUES
                    ((?), (?))`;
        await db.allAsync(sql, [userId, title]).catch(err => { error = err; });
        if (error) cb(error, null);
        else cb(null, {userId, title});
    }

    static async checkOwner(userId, noteId) {
        let error = null,
            sql = `SELECT * FROM Note WHERE id="${noteId}"`,
            note = await db.getAsync(sql).catch(err => { error = err; });

        if (error) return {error};
        if (+note.user_id === +userId) return {success: true};
        else return {success: false};
    }

    static async update (noteId, newTitle, cb) {
        let error = null,
            sql =`UPDATE Note SET title = (?) WHERE id=(?)`;
        await db.runAsync(sql, [newTitle, noteId]).catch(err => { error=err; });
        if (error) cb(error, null);
        else cb(null, {title: newTitle});
    }

    static async delete(noteId, cb) {
        let error = null,
            sql =`DELETE FROM Note WHERE id=(?)`;
        await db.runAsync(sql, [noteId]).catch(err => { error=err; });
        if (error) cb(error, null);
        else cb(null, {noteId});
    }
}


module.exports = Note;