const cool = require('cool-ascii-faces');


function init(server) {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        setInterval(() => socket.emit('face', {face: cool()}), 1000)
        console.log('user connected!');

        socket.on('disconnect', () => {
            console.log('user disconnected!');
        });
    });

}

module.exports = init;