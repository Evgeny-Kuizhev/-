'use strict'

const
    respond = require('./helpfullRespond'),
    Users = require('../models/Users');


exports.getAll = (req, res) => {
    function cb(err, users) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!users) return respond.failure(res, {message: 'Пользователи не найдены!'}, 404);
        respond.success(res, {users, message: 'Пользователи полученны!'});
    }
    Users.getAll(cb);
}

exports.getOne = (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, user) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!user) return respond.failure(res, {message: 'Пользователь не найден!'}, 404);
        respond.success(res, {user, message: 'Пользователь получен!'});
    }
    Users.getOne(req.params.id, cb);
}

exports.getUserNotes = (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, notes) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!notes) return respond.failure(res, {message: 'Записи пользователя не найдены!'}, 404);
        respond.success(res, {notes, message: 'Записи пользователя получены!'});
    }
    Users.getUserNotes(req.params.id, cb);
}

exports.create = (req, res) => {
    const p = req.body;
    if (!p || !p.username || !p.email) {
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, user) {
        console.log(err);
        if (err) return respond.failure(res, {message: err}, 500);
        if (!user) return respond.failure(res, {message: 'Пользователь возможно был добавлен, но бд не вернула его!'}, 404);

        respond.success(res, {user, message: 'Пользователь создан!!'});
    }
    Users.create(p.username, p.email, p.phone, p.birthday, cb);
}