function _respond(res, success, message, code) {
    message.success = success;
    res.status(code).json(message);
}

exports.success = (res, message) => {
    _respond(res, true, message, 200);
}

exports.failure = (res, message, code) => {
    _respond(res, false, message, code);
}