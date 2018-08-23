const
    router = require('express').Router(),
    userCntr = require('./userController'),
    passport = require('passport');

function init(app) {
    app.get('/', (req, res) => res.render('user/pages/home', {home: true, logged: req.isAuthenticated()}) );
    app.get('/profile', passport.authenticationMiddleware, userCntr.renderProfile);
    app.get('/login', passport.checkNotLogged, (req, res) => res.render('user/pages/login', {login: true}) );

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

    app.get('/signup', passport.checkNotLogged, (req, res) => res.render('user/pages/signup', {signup: true}) );

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
    }));

    app.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/');
    });

    // API/V1 ROUTES
    app.use('/api/v1/users', apiV1());
}

function apiV1() {
    router.get('/', userCntr.getAll); // needed?
    router.put('/:id', passport.authenticationMiddleware, userCntr.update);
    router.delete('/:id', passport.authenticationMiddleware, userCntr.delete);
    router.get('/:id/notes', userCntr.getNotes);
    return router;
}

module.exports = init;