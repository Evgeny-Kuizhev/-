'use strict'

const
    router = require('express').Router(),
    userCntr = require('../controllers/user'),
    noteCntr = require('../controllers/note'),
    tagCntr = require('../controllers/tag');


// ---------------USER ROUTES--------------- //
router.get('/users', userCntr.getAll);
router.get('/user/:id', userCntr.getOne);
router.get('/user/:id/notes', userCntr.getUserNotes);
router.post('/user', userCntr.create);
router.put('/user/:id', userCntr.change);


// ---------------NOTES ROUTES--------------- //
router.get('/notes', noteCntr.getAll);
router.get('/note/:id', noteCntr.getOne);
router.get('/notes/tag/:id', noteCntr.getTagNotes);
router.post('/note', noteCntr.create);
router.put('/note/:id', noteCntr.change);


// ---------------TAGS ROUTES--------------- //
router.get('/tags', tagCntr.getAll);
router.get('/tags/note/:id', tagCntr.getNoteTags);
router.post('/tag', tagCntr.create);


module.exports = router;