'use strict'

const
    respond = require('./helpfullRespond'),
    Notes = require('../models/Notes');


exports.getAll = (req, res) => {
    function cb(err, notes) {
        if (err) respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!notes) respond.failure(res, {message: 'Записи не найдены!'}, 404);
        respond.success(res, {notes, message: 'Записи полученны!'});
    }
    Notes.getAll(cb);
}

exports.getOne = (req, res) => {
    if (!req.params && !req.params.id){
        respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, note) {
        if (err) respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!note) respond.failure(res, {message: 'Записка не найден!'}, 404);
        respond.success(res, {note, message: 'Записка получен!'});
    }
    Notes.getOne(req.params.id, cb);
}

exports.getTagNotes = (req, res) => {
    if (!req.params && !req.params.id){
        respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, notes) {
        if (err) respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!notes) respond.failure(res, {message: 'Записка не найден!'}, 404);
        respond.success(res, {notes, message: 'Записка получен!'});
    }
    Notes.getTagNotes(req.params.id, cb);
}