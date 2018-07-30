const express = require('express'),
    router = express.Router();


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/features', (req, res) => {
    res.render('features');
});

router.get('/news', (req, res) => {
    res.render('news');
});


module.exports = router;