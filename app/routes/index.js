'use strict';

const express = require('express'),
    router = express.Router(),
    apiV1 = require('./v1'),

    authenticationMiddleware = require('../authenticate').middleware,
    passport = require('passport');


router.get('/', (req, res) => res.render('user/pages/home', {home: true}) );

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

router.get('/profile', authenticationMiddleware, renderProfile);

router.get('/login', (req, res) => res.render('user/pages/login', {login: true}) );

function renderProfile (req, res) {
    res.render('user/pages/profile', {
        profile: true,
        username: req.user.username
    });
}

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));


router.use('/api/v1', apiV1);


module.exports = router;