const
    http = require('http'),
    socketIO = require('socket.io');

function init(app) {
    const
        server = http.Server(app),
        io = socketIO(server);

    io.on('connection', socket => {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
        console.log('New connection!');
    });
}

module.exports = init;