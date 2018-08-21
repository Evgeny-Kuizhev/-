'use strict'

let request = require('supertest');
request = request('http://localhost:3000');
const assert = require('assert');


describe('Pages', () => {
    it('GET / should return status code 200', done => {request.get('/').expect(200, done)});
    it('GET /features should return status code 200', done => {request.get('/features').expect(200, done)});
    it('GET /news should return status code 200', done => { request.get('/news').expect(200, done)});
});
describe('API', () => {
    describe('GET /api/v1', () => {
        it('USERS should return all users', () => {
            return request
            .get('/api/v1/users')
            .expect(200)
            .then(res => assert(res.body.success));
        });
        it('USERS:1 should return user with id = 1', () => {
            return request
            .get('/api/v1/users/1')
            .expect(200)
            .then(res => assert(res.body.user.id, 1));
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
        it('CREATE USER should return new user', () => {
            return request
            .post('/api/v1/users')
            .send({"username": 'Evgeny', "email": 'evgen@yandex.ru'})
            .expect(200).then( res => {
                let b = res.body;
                assert(b.user.username === 'Evgeny')
            })
        });
        it('CREATE NOTE should new note', () => {
            return request
            .post('/api/v1/notes')
            .send({title: 'Начать есть кашу по утрам', user_id: 7})
            .expect(200).then(res => {
                let b = res.body;
                assert(b.note.title === 'Начать есть кашу по утрам')
            })
        });
        it('CREATE TAG should return new tag', () => {
            return request
            .post('/api/v1/tags')
            .send({title: 'taganrog'})
            .expect(200).then(res => {
                assert(res.body.tag.title === 'taganrog')
            })
        });
    });

    describe('PUT /api/v1', () => {
        it('CHANGE USER should return new user', () => {
            return request
            .put('/api/v1/users/1')
            .send({"username": 'Petya2', "phone": 12451425 })
            .expect(200).then( res => {
                let b = res.body;
                assert(b.updated.username === 'Petya2')
            })
        });
        it('CHANGE NOTE should new note', () => {
            return request
            .put('/api/v1/notes/3')
            .send({new_title: 'Съездить в отпуск'})
            .expect(200).then(res => {
                let b = res.body;
                assert(b.updated.title === 'Съездить в отпуск')
            })
        });
    });

    describe('DELETE /api/v1', () => {
        it('DELETE USER should return deleted user', () => {
            return request
            .delete('/api/v1/users/3')
            .expect(200).then( res => {
                let b = res.body;
                assert(b.message === 'Пользователь удален!')
            });
        });
        it('DELETE NOTE should deleted note', () => {
            return request
            .delete('/api/v1/notes/3')
            .expect(200).then(res => {
                let b = res.body;
                assert(b.success)
            });
        });
        it('DELETE TAG should return deleted tag', () => {
            return request
            .delete('/api/v1/tags/8')
            .expect(200).then(res => {
                assert(res.body.success)
            });
        });
    });
});