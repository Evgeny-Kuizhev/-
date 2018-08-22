const
    router = require('express').Router(),
    noteCntr = require('./noteController'),
    passport = require('passport');


function init(app) {
    app.use('/api/v1/notes', apiV1());
}

function apiV1() {
    router.get('/', noteCntr.getAll);
    router.post('/', noteCntr.create);
    router.route('/:id')
        .get(noteCntr.getOne)
        .put(noteCntr.update)
        .delete(noteCntr.delete)
    router.get('/:id/tags', noteCntr.getTags);
    return router;
}

module.exports = init;