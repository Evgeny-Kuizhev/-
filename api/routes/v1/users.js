'use strict'

const
    express = require('express'),
    router = express.Router(),
    usersCntr = require('../../controllers/users');

// получить всех пользователей
router.get('/', usersCntr.getAll);
// получить конкретного пользователя
router.get('/:id', usersCntr.getOne);
// получить записки пользователя
router.get('/:id/notes', usersCntr.getUserNotes);
// создать пользователя
router.post('/', usersCntr.create);


module.exports = router;