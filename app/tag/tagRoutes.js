const
    router = require('express').Router(),
    tagCntr = require('./tagController'),
    passport = require('passport');


function init(app) {
    app.use('/api/v1/tags', apiV1());
}

function apiV1() {
    router.get('/', tagCntr.getAll);
    router.get('/:id/notes', tagCntr.getNotes);
    router.post('/notes/:noteId', passport.authenticationMiddleware, tagCntr.create);
    router.delete('/:tagId/notes/:noteId', passport.authenticationMiddleware, tagCntr.delete);
    return router;
}

module.exports = init;