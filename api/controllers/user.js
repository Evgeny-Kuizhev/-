'use strict';

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
    if (!b || !b.username || !b.email || !b.password) {
        return respond.failure(res, {message: 'Имя, емайл и пароль обязательные поля!'}, 400);
    }
    function cb(err, user) {
        if (err) {
            if (err.code === "SQLITE_CONSTRAINT")
                return respond.failure(res, {message: "Имя или емайл уже существует"}, 400);
            return respond.failure(res, {message: "Бд вернула ошибку"}, 500);
        }
        respond.success(res, {user, message: 'Пользователь создан!!'});
    }
    User.create(b.username, b.email, b.password, b.phone, b.birthday, cb);
}

exports.update = (req, res) => {
    const [b, userId] = [req.body, req.params.id];
    if (!b || !req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    const updateFields = {
        username: b.username,
        email: b.email,
        phone: b.phone,
        birthday: b.birthday
    }
    for (let prop in updateFields) {
        if(!updateFields[prop])
            delete updateFields[prop];
    }
    if (!Object.keys(updateFields).length)
        return respond.failure(res, {message: 'Плохой запрос'}, 400);

    function cb(err, updated) {
        if (err) {
            if (err.code === "SQLITE_CONSTRAINT")
                return respond.failure(res, {message: "Уже существует, придумайте уникальное"}, 400);
            return respond.failure(res, {message: "Бд вернула ошибку"}, 500);
        }
        respond.success(res, {updated, message: 'Данные обновленны!'});
    }

    User.update(updateFields, userId, cb)
}

exports.delete = (req, res) => {
    if (!req.params || !req.params.id){
        return respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, user) {
        if (err) return respond.failure(res, {message: 'Ошибка бд.'}, 500);
        if (!user) return respond.failure(res, {message: 'Нет такого пользователя для удаления!'}, 404);
        respond.success(res, {user, message: 'Пользователь удален!'});
    }
    User.delete(req.params.id, cb);
}