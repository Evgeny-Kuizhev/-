const
    router = require('express').Router(),
    tagCntr = require('./tagController'),
    passport = require('passport');


function init(app) {
    app.use('/api/v1/tags', passport.authenticate('local-login'), passport.authenticationMiddleware, apiV1());
}

function apiV1() {
    router.get('/', tagCntr.getAll);
    router.get('/:id/notes', tagCntr.getNotes);
    router.post('/', tagCntr.create);
    router.delete('/:id', tagCntr.delete);
    return router;
}

module.exports = init;