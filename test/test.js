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
            .get('/api/v1/users/1')
            .expect(200)
            .then(res => assert(res.body.user.id, 1));
        });
        it('USERS:1/NOTES should return user\'s notes', () => {
            return request
            .get('/api/v1/users/1/notes')
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
            .get('/api/v1/notes/2')
            .expect(200)
            .then(res => {
                assert(res.body.note.id, 2);
            })
        });
        it('NOTES:2 should return tag\'s notes', () => {
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
        it('CREATE USER should return new user', done => {
            return request
            .post('/api/v1/users', {username: 'Evgeny', email: 'evgen@yandex.ru'})
            .expect(200).then( res => {
                let b = res.body,
                    o1 = b.username === 'Evgeny',
                    o2 = b.email === 'evgen@yandex.ru';
                    assert(o1 && o2)
            })
        });
        it('CREATE NOTE should new note', done => {
            return request
            .post('/api/v1/notes', {title: 'Начать есть кашу по утрам', user_id: 7})
            .expect(200).then(res => {
                let b = res.body,
                    o1 = b.title === 'Начать есть кашу по утрам',
                    o2 = b.user_id === 7;
                    assert(o1 && o2)
            })
        });
        it('CREATE TAG should return new tag', done => {
            return request
            .post('/api/v1/tags', {title: 'taganrog'})
            .expect(200).then(res => {
                assert(res.body.title, 'taganrog')
            })
        });
    });

    // describe('PUT /api/v1', () => {
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