'use strict'

const
    respond = require('./helpfullRespond'),
    Tags = require('../models/Tags');


exports.getAll = (req, res) => {
    function cb(err, tags) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!tags) return respond.failure(res, {message: 'Теги не найдены!'}, 404);
        respond.success(res, {tags, message: 'Теги полученны!'});
    }
    Tags.getAll(cb);
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
    Tags.getNoteTags(req.params.id, cb);
}