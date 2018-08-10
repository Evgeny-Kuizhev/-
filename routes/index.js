const express = require('express'),
    router = express.Router(),
    apiV1 = require('./v1');


router.get('/', (req, res) => res.render('home') );

router.get('/features', (req, res) => res.render('features') );

router.get('/news', (req, res) => res.render('news') );

router.use('/api/v1', apiV1)


module.exports = router;