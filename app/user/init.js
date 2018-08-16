const
    userCntr = require('./userController'),
    passport = require('passport');

function initUser (app) {

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
    app.get('/api/v1/users', userCntr.getAll)
    app.post('/api/v1/users', userCntr.create)
    app.get('/api/v1/users/:id', userCntr.getOne)
    app.put('/api/v1/users/:id', userCntr.update)
    app.delete('/api/v1/users/:id', userCntr.delete)
    app.get('/api/v1/users/:id/notes', userCntr.getNotes);
}

module.exports = initUser;