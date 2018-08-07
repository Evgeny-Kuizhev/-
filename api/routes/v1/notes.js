'use strict'

const
    express = require('express'),
    router = express.Router(),
    notesCntr = require('../../controllers/notes');

// получить все записки
router.get('/', notesCntr.getAll);
// получить конкретную записку
router.get('/:id', notesCntr.getOne);
// получить записки по тегу
router.get('/tag/:id', notesCntr.getTagNotes);



module.exports = router;