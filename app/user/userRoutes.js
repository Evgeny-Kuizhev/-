const
    router = require('express').Router(),
    userCntr = require('./userController'),
    passport = require('passport');


function init(app) {
    app.get('/', (req, res) => res.render('user/pages/home', {home: true}) );
    app.get('/profile', passport.authenticationMiddleware, userCntr.renderProfile);
    app.get('/login', (req, res) => res.render('user/pages/login', {login: true}) );

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

    app.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/');
    });

    // API/V1 ROUTES
    //app.get('/api/v1/users', userCntr.getAll)
    app.use('/api/v1/users', apiV1());

}

function apiV1() {
    router.get('/', userCntr.getAll)
    router.post('/', userCntr.create)
    router.get('/:id', userCntr.getOne)
    router.put('/:id', userCntr.update)
    router.delete('/:id', userCntr.delete)
    router.get('/:id/notes', userCntr.getNotes);
    return router;
}

module.exports = init;