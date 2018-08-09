'use strict'

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

exports.getNoteTags = (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, tags) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!tags) return respond.failure(res, {message: 'Теги записки не найдены!'}, 404);
        respond.success(res, {tags, message: 'Теги записки получены!'});
    }
    Tag.getNoteTags(req.params.id, cb);
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