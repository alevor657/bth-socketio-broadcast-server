let Srv = require('../chatServer');
let io = require('socket.io-client');


let port = process.env.DBWEBB_SOCKETIO_PORT || 1340;
let socketURL = 'http://0.0.0.0:' + port;
let options = {
    // transports: ['websocket'],
    // forceNew: true,
    reconnection: false
};

var srv;

beforeAll(function () {
    srv = new Srv(port);
});

test('It connects and disconnects', function (done) {
    let client1 = io.connect(socketURL, options);

    client1.on('connect', () => {
        expect(srv.connections).toHaveLength(1);
        client1 = client1.disconnect();
    });


    client1.on('disconnect', () => {
        console.log(srv.connections.length);

        setTimeout(() => {
            expect(srv.connections).toHaveLength(0);
            done();
        }, 1000);
    });
});

test('It broadcasts messages', done => {
    let client1 = io.connect(socketURL, options);

    client1.on('connect', () => {
        client1.emit('chat msg', {
            nick: 'tester',
            msg: 'testing'
        });

        client1.on('chat msg', data => {
            console.log(data);
            expect(data).toBeInstanceOf(Object);
            expect(data).toHaveProperty('nick');
            expect(data).toHaveProperty('msg');
            client1.disconnect();
            done();
        });
    });
});
