'use strict'

const
    respond = require('./helpfullRespond'),
    User = require('../models/User');


exports.getAll = (req, res) => {
    function cb(err, users) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!users) return respond.failure(res, {message: 'Пользователи не найдены!'}, 404);
        respond.success(res, {users, message: 'Пользователи полученны!'});
    }
    User.getAll(cb);
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
    User.getOne(req.params.id, cb);
}

exports.getNotes = (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, notes) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!notes) return respond.failure(res, {message: 'Записи пользователя не найдены!'}, 404);
        respond.success(res, {notes, message: 'Записи пользователя получены!'});
    }
    User.getNotes(req.params.id, cb);
}

exports.create = (req, res) => {
    const b = req.body;
    if (!b || !b.username || !b.email) {
        return respond.failure(res, {message: 'Имя и емайл обязательные поля!'}, 400);
    }
    function cb(err, user) {
        if (err) {
            if (err.code === "SQLITE_CONSTRAINT")
                return respond.failure(res, {message: "Имя или емайл уже существует"}, 400);
            return respond.failure(res, {message: "Бд вернула ошибку"}, 500);
        }
        respond.success(res, {user, message: 'Пользователь создан!!'});
    }
    User.create(b.username, b.email, b.phone, b.birthday, cb);
}

exports.change = (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    const [b, id] = [req.body, req.params.id];
    function cb(err, updated) {
        if (err) {
            if (err.code === "SQLITE_CONSTRAINT")
                return respond.failure(res, {message: "Уже существует, придумайте уникальное"}, 400);
            return respond.failure(res, {message: "Бд вернула ошибку"}, 500);
        }
        respond.success(res, {updated, message: 'Данные обновленны!'});
    }
    if (b.new_username) {
        User.update('username', b.new_username, id, cb);
    } else if (b.new_email) {
        User.update('email', b.new_email, id, cb);
    } else if (b.new_phone) {
        User.update('phone', b.new_phone, id, cb);
    } else if (b.new_birthday) {
        User.update('birthday', b.new_birthday, id, cb);
    } else {
        respond.failure(res, {message: 'Плохой запрос!'}, 400);
    }
}

exports.delete = (req, res) => {

}