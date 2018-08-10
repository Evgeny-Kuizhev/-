'use strict'

const
    express = require('express'),
    router = express.Router(),
    usersRoute = require('./users'),
    notesRoute = require('./notes'),
    tagsRoute = require('./tags');


router.get('/', (req, res) => res.send('API V1'));

router.use('/users', usersRoute);
router.use('/notes', notesRoute);
router.use('/tags', tagsRoute);


module.exports = router;