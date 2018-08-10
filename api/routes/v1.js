'use strict'

const
    router = require('express').Router(),
    userCntr = require('../controllers/user'),
    noteCntr = require('../controllers/note'),
    tagCntr = require('../controllers/tag');


// ---------------USER ROUTES--------------- //
router.get('/users', userCntr.getAll);
router.get('/user/:id', userCntr.getOne);
router.get('/user/:id/notes', userCntr.getNotes);
router.post('/user', userCntr.create);
router.put('/user/:id', userCntr.change);
router.delete('/user/:id', userCntr.delete);


// ---------------NOTES ROUTES--------------- //
router.get('/notes', noteCntr.getAll);
router.get('/note/:id', noteCntr.getOne);
router.get('/note/:id/tags', noteCntr.getTags);
router.post('/note', noteCntr.create);
router.put('/note/:id', noteCntr.change);
router.delete('/note/:id', noteCntr.delete)


// ---------------TAGS ROUTES--------------- //
router.get('/tags', tagCntr.getAll);
router.get('/tag/:id/notes', tagCntr.getNotes);
router.post('/tag', tagCntr.create);
router.delete('/tag/:id', tagCntr.delete)


module.exports = router;