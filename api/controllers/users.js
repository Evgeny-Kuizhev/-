'use strict'

const
    respond = require('./helpfullRespond'),
    users = require('../models/Users');

console.log(users.getAll);
exports.getAll = (req, res) => {
    function cb(err, users) {
        if (err) respond.failure(res, {message: 'Ошибка бд.'}, 500);
        //if (!users.length) respond.failure(res, {message: 'Пользователи не найдены!'}, 404);
        respond.success(res, {users, message: 'Пользователи полученны!'});
    }
    users.getAll(cb);
}

exports.getOne = (req, res) => {
    if (!req.params && !req.params.id){
        respond.failure(res, {message: 'Плохой запрос'}, 400);
    }
    function cb(err, user) {
        if (err) respond.failure(res, {message: 'Ошибка бд.'}, 500);
        //if (!user.length) respond.failure(res, {message: 'Пользователь не найден!'}, 404);
        respond.success(res, {user: user, message: 'Пользователь получен!'});
    }
    users.getOne(req.params.id, cb);
}