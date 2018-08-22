'use strict';

const
    passport = require('passport'),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    LocalStrategy = require('passport-local').Strategy,
    authenticationMiddleware = require('./middleware').authenticationMiddleware,

    db = require('../database/db');


function findUser (email, cb) {
    let sql = `select * from User where email="${email}"`;
    db.get(sql, cb);
}

passport.serializeUser((user, cb) => {
  cb(null, user.email)
});

passport.deserializeUser((email, cb) => {
  findUser(email, cb)
});

function initPassport () {
    passport.use('local-login', new LocalStrategy(passportConfig, loginStrategy));
    passport.use('local-signup', new LocalStrategy(passportConfig, signupStrategy));
    passport.authenticationMiddleware = authenticationMiddleware;
}
 // find custom field
 const passportConfig = {
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // may be
}
function loginStrategy(req, email, password, done) {
    findUser(email, cb);

    function cb(err, user) {
        if (err) return done(err);
        // User not found
        if (!user) return done(null, false);
        // Always use hashed passwords and fixed time comparison
        bcrypt.compare(password, user.password, (err, isValid) => {
            if (err) return done(err);
            if (!isValid) return done(null, false);
            return done(null, user);
        });
    }
}
function signupStrategy(req, email, password, done) {
    process.nextTick( () => {
        findUser(email, cb);

        async function cb(err, user) {
            if (err) return done(err);
            if (user) return done(null, false);
            if (req.user) return done('Clear cookies');

            const salt = bcrypt.genSaltSync(saltRounds),
                passwordHash = bcrypt.hashSync(password, salt),
                newUser = {
                    username: req.body.username,
                    password: passwordHash,
                    email,
                    phone: req.body.phone,
                    birthday: req.body.birthday
                },
                sql =`INSERT INTO User (username, email, password, phone, birthday) VALUES
                    ((?), (?), (?), (?), (?))`;
            await db.runAsync(sql, [newUser.username, newUser.email, newUser.password, newUser.phone, newUser.birthday])
                .then(() => done(null, newUser))
                .catch(done)
        }
    })
}

module.exports = initPassport;
