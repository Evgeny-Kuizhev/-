'use strict'

const
    router = require('express').Router(),
    userCntr = require('../controllers/user'),
    noteCntr = require('../controllers/note'),
    tagCntr = require('../controllers/tag');


// ---------------USER ROUTES--------------- //
router.get('/users', userCntr.getAll);
router.post('/user', userCntr.create);
router.route('/user/:id')
    .get(userCntr.getOne)
    .put(userCntr.change)
    .delete(userCntr.delete)
router.get('/user/:id/notes', userCntr.getNotes);


// ---------------NOTES ROUTES--------------- //
router.get('/notes', noteCntr.getAll);
router.post('/note', noteCntr.create);
router.route('/note/:id')
    .get(noteCntr.getOne)
    .put(noteCntr.change)
    .delete(noteCntr.delete)
router.get('/note/:id/tags', noteCntr.getTags);


// ---------------TAGS ROUTES--------------- //
router.get('/tags', tagCntr.getAll);
router.get('/tag/:id/notes', tagCntr.getNotes);
router.post('/tag', tagCntr.create);
router.delete('/tag/:id', tagCntr.delete);


module.exports = router;