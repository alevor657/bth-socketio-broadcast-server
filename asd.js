let Srv = require('./chatServer');
let io = require('socket.io-client');

let srv = new Srv(1340);

let socketURL = 'http://0.0.0.0:' + 1340;

let options = {
    transports: ['websocket'],
    'force new connection': true
};

var client1 = io.connect(socketURL, options);

client1.on('connect', () => {
    console.warn('connect');
})
