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
            .then(res => assert(res.body.users, !undefined));
        });
        it('USERS:1 should return user with id = 1', () => {
            return request
            .get('/api/v1/user/1')
            .expect(200)
            .then(res => assert(res.body.user.id, 1));
        });
        it('USERS:1/NOTES should return user\'s notes', () => {
            return request
            .get('/api/v1/user/1/notes')
            .expect(200)
            .then(res => assert(res.body.notes, !undefined));
        });
        it('NOTES should all notes', () => {
            return request
            .get('/api/v1/notes')
            .expect(200)
            .then(res => assert(res.body.notes, !undefined));
        });
        it('NOTES:2 should return note with id = 2', () => {
            return request
            .get('/api/v1/note/2')
            .expect(200)
            .then(res => {
                assert(res.body.note.id, 2);
            })
        });
        it('NOTES should return tag\'s notes', () => {
            return request
            .get('/api/v1/notes/tag/7')
            .expect(200)
            .then(res => {
                assert(res.body.notes, !undefined);
            })
        });
        it('TAGS should return all tags', () => {
            return request
            .get('/api/v1/tags')
            .expect(200)
            .then(res => assert(res.body.tags, !undefined));
        });
        it('TAGS should return note\'s tags', () => {
            return request
            .get('/api/v1/tags/note/4')
            .expect(200)
            .then(res => assert(res.body.tags, !undefined));
        });
    });

    describe('POST /api/v1', () => {
        it('CREATE USER should return new user', () => {
            return request
            .post('/api/v1/user')
            .send({"username": 'Evgeny', "email": 'evgen@yandex.ru'})
            .expect(200).then( res => {
                let b = res.body;
                assert(b.user.username === 'Evgeny')
            })
        });
        it('CREATE NOTE should new note', () => {
            return request
            .post('/api/v1/note')
            .send({title: 'Начать есть кашу по утрам', user_id: 7})
            .expect(200).then(res => {
                let b = res.body;
                assert(b.note.title === 'Начать есть кашу по утрам')
            })
        });
        it('CREATE TAG should return new tag', () => {
            return request
            .post('/api/v1/tag')
            .send({title: 'taganrog'})
            .expect(200).then(res => {
                assert(res.body.tag.title === 'taganrog')
            })
        });
    });

    describe('PUT /api/v1', () => {
        it('CHANGE USER should return new user', () => {
            return request
            .put('/api/v1/user/1')
            .send({"new_username": 'Petya2' })
            .expect(200).then( res => {
                let b = res.body;
                assert(b.updated.username === 'Petya2')
            })
        });
        it('CHANGE NOTE should new note', () => {
            return request
            .put('/api/v1/note/3')
            .send({new_title: 'Съездить в отпуск'})
            .expect(200).then(res => {
                let b = res.body;
                console.log(b);
                assert(b.updated.title === 'Съездить в отпуск')
            })
        });
    });

    // describe('DELETE /api/v1', () => {
    //     it('USERS should return status code 200', done => {
    //         request
    //         .get('/')
    //         .expect(400, done)
    //     });
    //     it('USERS:ID should return status code 200', done => {
    //         request
    //         .get('/')
    //         .expect(200, done)
    //     });
    //     it('NOTES should return status code 200', done => {
    //         request
    //         .get('/')
    //         .expect(400, done)
    //     });
    //     it('NOTES:ID should return status code 200', done => {
    //         request
    //         .get('/')
    //         .expect(200, done)
    //     });
    //     it('TAGS should return status code 200', done => {
    //         request
    //         .get('/')
    //         .expect(200, done)
    //     });
    // });
});