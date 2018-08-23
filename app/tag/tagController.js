'use strict';

const
    respond = require('../helpfull functions').respond,
    Tag = require('./TagModel'),
    Note = require('../note/NoteModel');


exports.getAll = (req, res) => {
    function cb(err, tags) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!tags) return respond.failure(res, {message: 'Теги не найдены!'}, 404);
        respond.success(res, {tags, message: 'Теги полученны!'});
    }
    Tag.getAll(cb);
}

exports.getNotes = (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, notes) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!notes) return respond.failure(res, {message: 'Записки не найдены!'}, 404);
        respond.success(res, {notes, message: 'Записки получены!'});
    }
    Tag.getNotes(req.params.id, cb);
}

exports.create = async (req, res) => {
    const noteId = req.params.noteId;
    if (!noteId){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    if (!req.user)
        return respond.failure(res, {message: 'У вас не достаточно привелегий'}, 403)

    const isOwner = await Note.checkOwner(req.user.id, noteId);
    if (isOwner.error){
        if(isOwner.error === 404) return respond.failure(res, {message: 'Записка не найдена!'}, 404);
        return respond.failure(res, {message: 'Ошибка бд.'}, 500);
    }
    if (!isOwner.success)
        return respond.failure(res, {message: 'У вас не достаточно привелегий'}, 403);

    function cb(err, tag) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        // if (!tags) return respond.failure(res, {message: 'Теги записки не найдены!'}, 404);
        respond.success(res, {tag, message: 'Тег добавлен!'});
    }
    Tag.create(req.body.title, noteId, cb);
}

exports.delete = async (req, res) => {
    const [tagId, noteId] = [req.params.tagId, req.params.noteId];
    if (!tagId || !noteId){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }

    if (!req.user)
        return respond.failure(res, {message: 'У вас не достаточно привелегий'}, 403);

    const isOwnerNote = await Note.checkOwner(req.user.id, noteId);
    if (isOwnerNote.error){
        if(isOwnerNote.error === 404) return respond.failure(res, {message: 'Записка не найдена!'}, 404);
        return respond.failure(res, {message: 'Ошибка бд.'}, 500);
    }
    if (!isOwnerNote.success)
        return respond.failure(res, {message: 'У вас не достаточно привелегий'}, 403);

    const isOwnerTag = await Tag.checkOwner(noteId, tagId) ;
    if (isOwnerTag.error){
        if(isOwnerTag.error === 404) return respond.failure(res, {message: 'Тег не найден!'}, 404);
        return respond.failure(res, {message: 'Ошибка бд.'}, 500);
    }
    if (!isOwnerTag.success)
        return respond.failure(res, {message: 'У вас не достаточно привелегий'}, 403);

    function cb(err, tag) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!tag) return respond.failure(res, {message: 'Нет такого тега для данной записки!'}, 404);
        respond.success(res, {tag, message: 'Тег удален!'});
    }
    Tag.delete(tagId, noteId, cb);
}