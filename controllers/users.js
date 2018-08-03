'use strict'

const db = require('../database/db');


function sendJSON(res, status, success, message) {
    message.success = success;
    res.status(status).json(message);
}

exports.getAll = (req, res) => {
    db.all('SELECT * FROM User', (err, rows) => {
        if (err) sendJSON(res, 500, false, {
            message: err
        });
        else sendJSON(res, 200, true, {
            users: rows,
            message: 'Пользователи полученны!'
        });
    });
}

exports.getOne = (req, res) => {
    if (!req.params && !req.params.id){
        sendJSON(req, 400, false, {message: 'Плохой запрос'});
    } else {
        db.get('SELECT * FROM User WHERE id=? LIMIT 1', [req.params.id], (err, row) => {
            if (err) sendJSON(res, 404, false, {
                message: 'Пользователь не найден!'
            });
            else sendJSON(res, 200, true, {
                user: row,
                message: 'Пользователь получен!'
            });
        });
    }
}