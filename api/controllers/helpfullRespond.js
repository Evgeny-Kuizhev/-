'use strict'

const headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10,
    "Content-Type": "application/json"
  };

function _respond(res, success, body, status) {
    body.success = success;
    res.set(headers);
    res.status(status).send(body);
}

exports.success = (res, data) => {
    _respond(res, true, data, 200);
}

exports.failure = (res, data, code) => {
    _respond(res, false, data, code);
}