'use strict';

const
    respond = require('../helpfull functions/').respond,
    Note = require('./NoteModel');


exports.getAll = (req, res) => {
    function cb(err, notes) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!notes) return respond.failure(res, {message: 'Записи не найдены!'}, 404);
        respond.success(res, {notes, message: 'Записи полученны!'});
    }
    Note.getAll(cb);
}

exports.getOne = (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, note) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!note) return respond.failure(res, {message: 'Записка не найден!'}, 404);
        respond.success(res, {note, message: 'Записка получен!'});
    }
    Note.getOne(req.params.id, cb);
}

exports.getTags = (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, tags) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!tags) return respond.failure(res, {message: 'Теги записки не найдены!'}, 404);
        respond.success(res, {tags, message: 'Теги записки получены!'});
    }
    Note.getTags(req.params.id, cb);
}

exports.create = (req, res) => {
    const b = req.body;
    if (!b || !b.user_id || !b.title){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    if (+b.user_id  !== +req.user.id)
        return respond.failure(res, {message: 'У вас не достаточно привелегий'}, 403)

    function cb(err, note) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        //if (!note) return respond.failure(res, {message: 'Записка не создана!'}, 404);
        respond.success(res, {note, message: 'Записка создана!'});
    }
    Note.create(b.user_id, b.title, cb);
}

exports.update = async (req, res) => {
    const [b, p] = [req.body, req.params];
    if (!b || !p || !b.title || !p.id) {
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    if (!req.user)
        return respond.failure(res, {message: 'У вас не достаточно привелегий'}, 403)

    const isOwner = await Note.checkOwner(req.user.id, p.id);
    if (isOwner.error)
        return respond.failure(res, {message: 'Ошибка бд.'}, 500);
    if (!isOwner.success)
        return respond.failure(res, {message: 'У вас не достаточно привелегий'}, 403)

    function cb(err, updated) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        //if (!note) return respond.failure(res, {message: 'Записка не создана!'}, 404);
        respond.success(res, {updated, message: 'Записка обновленна!'});
    }
    Note.update(p.id, b.title, cb);
}

exports.delete = async (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }

    if (!req.user)
        return respond.failure(res, {message: 'У вас не достаточно привелегий'}, 403)

    const isOwner = await Note.checkOwner(req.user.id, req.params.id);
    if (isOwner.error){
        if(isOwner.error === 404) return respond.failure(res, {message: 'Записка не найдена!'}, 404);
        return respond.failure(res, {message: 'Ошибка бд.'}, 500);
    }
    if (!isOwner.success)
        return respond.failure(res, {message: 'У вас не достаточно привелегий'}, 403);

    function cb(err, note) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!note) return respond.failure(res, {message: 'Нет такой записки для удаления!'}, 404);
        respond.success(res, {note, message: 'Записка удалена!'});
    }
    Note.delete(req.params.id, cb);
}