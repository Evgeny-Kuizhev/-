'use strict'

const
    express = require('express'),
    router = express.Router(),
    tagsCntr = require('../../controllers/tags');

// получить все теги
router.get('/', tagsCntr.getAll);
// получить теги для записки
router.get('/note/:id', tagsCntr.getNoteTags);






module.exports = router;