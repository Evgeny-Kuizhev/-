'use strict';

const
    respond = require('./helpfullRespond'),
    Tag = require('../models/Tag');


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

exports.create = (req, res) => {
    if (!req.body || !req.body.title) {
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, tag) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        // if (!tags) return respond.failure(res, {message: 'Теги записки не найдены!'}, 404);
        respond.success(res, {tag, message: 'Тег добавлен!'});
    }
    Tag.create(req.body.title, cb);
}

exports.delete = (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, tag) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!tag) return respond.failure(res, {message: 'Нет такого тега для удаления!'}, 404);
        respond.success(res, {tag, message: 'Тег удален!'});
    }
    Tag.delete(req.params.id, cb);
}