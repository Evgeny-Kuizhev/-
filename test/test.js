'use strict';

let request = require('supertest');
request = request('http://localhost:3000');
const agent = request.agent('http://localhost:3000');
const assert = require('assert');


describe('Pages, Login, SignUp', () => {
    it('GET / should return status code 200', done => {request.get('/').expect(200, done)});
    it('Login user', done=> {
        request
        .post('/login')
        .type('form')
        .send({"email": 'pet@yandex.ru', password: "password123"})
        .expect(302)
        .expect('Location', '/profile')
        .end((err, res) => {
            if (err) return done(err);
            // request.saveCookies(res);
            return done();
        });
    });
    it('SingUp user', done => {
        request
        .post('/signup')
        .type('form')
        .send({"email": 'evgen@yandex.ru', password: "password123", username: "Evgeny", phone: 8978978932})
        .expect(302)
        .expect('Location', '/profile')
        .end((err, res) => {
            if (err) return done(err);
            // request.saveCookies(res);
            return done();
        });
    });
});
describe('API', () => {
    describe('GET /api/v1', () => {
        it('USERS should return all users', () => {
            return request
            .get('/api/v1/users')
            .expect(200)
            .then(res => assert(res.body.success));
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

    describe('POST /api/v1', () => {
        it('CREATE NOTE should new note', () => {
            return request
            .post('/api/v1/notes')
            .send({title: 'Начать есть кашу по утрам', user_id: 7, "email": 'pet@yandex.ru', password: "password123"})
            .expect(200).then(res => {
                let b = res.body;
                assert(b.note.title === 'Начать есть кашу по утрам')
            })
        });
        it('CREATE TAG should return new tag', () => {
            return request
            .post('/api/v1/tags')
            .send({title: 'taganrog', "email": 'pet@yandex.ru', password: "password123"})
            .expect(200).then(res => {
                assert(res.body.tag.title === 'taganrog')
            })
        });
    });

    describe('PUT /api/v1', () => {
        it('CHANGE USER should return new user', () => {
            return request
            .put('/api/v1/users/1')
            .send({"username": 'Petya2', "phone": 12451425, "email": 'pet@yandex.ru', password: "password123" })
            .expect(200).then( res => {
                let b = res.body;
                assert(b.updated.username === 'Petya2')
            })
        });
        it('CHANGE NOTE should new note', () => {
            return request
            .put('/api/v1/notes/3')
            .send({title: 'Съездить в отпуск',  "email": 'pet@yandex.ru', password: "password123"})
            .expect(200).then(res => {
                let b = res.body;
                assert(b.updated.title === 'Съездить в отпуск')
            })
        });
    });

    describe('DELETE /api/v1', () => {
        it('DELETE NOTE should deleted note', () => {
            return request
            .delete('/api/v1/notes/3')
            .send({ "email": 'pet@yandex.ru', password: "password123"})
            .expect(200).then(res => {
                let b = res.body;
                assert(b.success)
            });
        });
        it('DELETE TAG should return deleted tag', () => {
            return request
            .delete('/api/v1/tags/8')
            .send({ "email": 'pet@yandex.ru', password: "password123"})
            .expect(200).then(res => {
                assert(res.body.success)
            });
        });
        it('DELETE USER should delete user', () => {
            return request
            .delete('/api/v1/users/1')
            .send({ "email": 'pet@yandex.ru', password: "password123"})
            .expect(200).then( res => {
                let b = res.body;
                assert(b.message === 'Пользователь удален!')
            });
        });
    });
});