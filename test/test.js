'use strict';

let request = require('supertest');
request = request('http://localhost:3000');
const assert = require('assert');

let Cookies;

describe('Home, Login, Logout, SignUp', () => {
    it('GET / should return status code 200', done => { request.get('/').expect(200, done) });
    it('SingUp user', done => {
        request
        .post('/signup')
        .send({"email": 'evgen@yandex.ru', password: "password123", username: "Evgeny", phone: 8978978932})
        .expect(302)
        .expect('Location', '/profile')
        .end((err, res) => {
            if (err) return done(err);
            Cookies = res.header['set-cookie'];
            return done();
        });
    });
    it('Logout user', done => {
        const req = request.get('/logout');
        req.cookies = Cookies;
        req
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
            if (err) return done(err);
            //assert(!res.header['set-cookie'])
            Cookies = null;
            done();
        });
    });
    it('Login user', done => {
        request
        .post('/login')
        .send({"email": 'pet@yandex.ru', password: "password123"})
        .expect(302)
        .expect('Location', '/profile')
        .end((err, res) => {
            if (err) return done(err);
            Cookies = res.header['set-cookie'];
            done();
        });
    });
});
describe('API', () => {
    describe('GET /api/v1', () => {
        it('USERS should return 403 Forbiden', done => {
            const req = request.get('/api/v1/users');
            req.cookies = Cookies;
            req
            .expect(403)
            .end( (err, res) => {
                if (err) return done(err);
                assert(!res.body.success);
                done();
            });
        });
        it('USERS:1/NOTES should return user\'s notes', () => {
            return request
            .get('/api/v1/users/1/notes')
            .expect(200)
            .then(res => assert(res.body.success));
        });
        it('NOTES should all notes', () => {
            return request
            .get('/api/v1/notes')
            .expect(200)
            .then(res => assert(res.body.success));
        });
        it('NOTES:2 should return note with id = 2', () => {
            return request
            .get('/api/v1/notes/2')
            .expect(200)
            .then(res => {
                assert(res.body.note.id, 2);
            })
        });
        it('NOTES should return tag\'s', () => {
            return request
            .get('/api/v1/notes/4/tags')
            .expect(200)
            .then(res => {
                assert(res.body.success);
            })
        });
        it('TAGS should return all tags', () => {
            return request
            .get('/api/v1/tags')
            .expect(200)
            .then(res => assert(res.body.success));
        });
        it('TAGS should return note\'s', () => {
            return request
            .get('/api/v1/tags/7/notes')
            .expect(200)
            .then(res => assert(res.body.success));
        });
    });

    describe('POST /api/v1', done => {
        it('CREATE NOTE should new note', done => {
            const req = request.post('/api/v1/notes');
            req.cookies = Cookies;
            req
            .send({title: 'Начать есть кашу по утрам', user_id: 1})
            .expect(200)
            .end( (err, res) => {
                if (err) return done(err);
                let b = res.body;
                assert(b.note.title === 'Начать есть кашу по утрам')
                done();
            })
        });
        it('CREATE TAG should return new tag', done => {
            const req = request.post('/api/v1/tags/notes/5');
            req.cookies = Cookies;
            req
            .send({title: 'taganrog'})
            .expect(200)
            .end( (err, res) => {
                if (err) return done(err);
                assert(res.body.tag.title === 'taganrog');
                assert(+res.body.tag.noteId === 5);
                done();
            })
        });
    });

    describe('PUT /api/v1', () => {
        it('CHANGE USER should return new user', done => {
            const req = request.put('/api/v1/users/1');
            req.cookies = Cookies;
            req
            .send({"username": 'Petya2', "phone": 12451425 })
            .expect(200)
            .end( (err, res) => {
                if (err) return done(err);
                let b = res.body;
                assert(b.updated.username === 'Petya2')
                done();
            })
        });
        it('CHANGE NOTE should new note', done => {
            const req = request.put('/api/v1/notes/2');
            req.cookies = Cookies;
            req
            .send({title: 'Съездить в отпуск' })
            .expect(200)
            .end( (err, res) => {
                if (err) return done(err);
                let b = res.body;
                assert(b.updated.title === 'Съездить в отпуск');
                done();
            })
        });
    });

    describe('DELETE /api/v1', () => {
        it('DELETE TAG should return tag_id and note_id', done => {
            const req = request.delete('/api/v1/tags/7/notes/2');
            req.cookies = Cookies;
            req
            .expect(200)
            .end( (err, res) => {
                if (err) return done(err);
                assert.equal(res.body.tag.tagId, 7);
                assert.equal(res.body.tag.noteId, 2);
                done();
            });
        });
        it('DELETE NOTE should deleted note', done => {
            const req = request.delete('/api/v1/notes/1');
            req.cookies = Cookies;
            req
            .expect(200)
            .end( (err, res) => {
                if (err) return done(err);
                let b = res.body;
                assert(b.success)
                done();
            });
        });
        it('DELETE USER should delete user', done => {
            const req = request.delete('/api/v1/users/1');
            req.cookies = Cookies;
            req
            .send({ "email": 'pet@yandex.ru', password: "password123"})
            .expect(200)
            .end( (err, res) => {
                if (err) return done(err);
                let b = res.body;
                assert(b.message === 'Пользователь удален!');
                done();
            });
        });
    });
});