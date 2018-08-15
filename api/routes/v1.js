'use strict';

const
    router = require('express').Router(),
    userCntr = require('../controllers/user'),
    noteCntr = require('../controllers/note'),
    tagCntr = require('../controllers/tag'),

    passport = require('passport');


// ---------------USER ROUTES--------------- //
router.get('/users', userCntr.getAll);
router.post('/users', userCntr.create);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }), userCntr.create);
  
router.route('/users/:id')
    .get(userCntr.getOne)
    .put(userCntr.update)
    .delete(userCntr.delete)
router.get('/users/:id/notes', userCntr.getNotes);


// ---------------NOTES ROUTES--------------- //
router.get('/notes', noteCntr.getAll);
router.post('/notes', noteCntr.create);
router.route('/notes/:id')
    .get(noteCntr.getOne)
    .put(noteCntr.update)
    .delete(noteCntr.delete)
router.get('/notes/:id/tags', noteCntr.getTags);


// ---------------TAGS ROUTES--------------- //
router.get('/tags', tagCntr.getAll);
router.get('/tags/:id/notes', tagCntr.getNotes);
router.post('/tags', tagCntr.create);
router.delete('/tags/:id', tagCntr.delete);


module.exports = router;