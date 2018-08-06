'use strict'

const
    express = require('express'),
    router = express.Router(),
    usersCntr = require('../../controllers/users');


router.get('/', usersCntr.getAll);

router.get('/:id', usersCntr.getOne);



module.exports = router;