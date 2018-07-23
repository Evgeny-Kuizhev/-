const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express();


// enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render();
});


app.get('/arr', (req, res) => {
    const blocks = [111, 3333, 444];
    res.send('<div>hi</div>');
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));