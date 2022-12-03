require('custom-env').env(process.env.NODE_ENV)

var io = require('socket.io-client');
var socket = io.connect(`http://${process.env.IO_HOST}:${process.env.IO_PORT}`, { reconnect: true });



socket.on(`${process.env.CHANNEL}`, (data) => {
    console.log(data);
  });



// // Add a connect listener
// socket.on('connect', function (socket) {
//     console.log('Connected!');
// });
// socket.emit('CH01', 'me', 'test msg');