require('babel-polyfill');

let Chat = require('../chatServer');
let io = require('socket.io-client');


let port = process.env.DBWEBB_SOCKETIO_PORT || 1340;
let socketURL = 'http://0.0.0.0:' + port;
let options = {
    // transports: ['websocket'],
    // forceNew: true,
    reconnection: false
};

let http = require('http').createServer().listen(port);

var srv;
let userData = {
    username: 'tester',
    email: 'tester@unittests.se'
};

beforeAll(function () {
    srv = new Chat(http);
});

test('It connects and disconnects', function (done) {
    let client1 = io.connect(socketURL, options);


    client1.on('connect', () => {
        client1.emit('new user', userData);
        client1.on('update usernames', data => {
            console.log('test');
            expect(srv.users).toHaveLength(1);
            expect(srv.users[0]).toEqual({[userData.username]: userData});
            client1 = client1.disconnect();
        });
    });


    client1.on('disconnect', () => {
        console.log('disconnect')
        setTimeout(() => {
            expect(srv.users).toHaveLength(0);
            done();
        }, 1000);
    });
});

test('It broadcasts messages', done => {
    let client1 = io.connect(socketURL, options);
    let msg = {
        message: 'testing',
        timestamp: new Date(),
        ...userData
    };

    client1.on('connect', () => {
        client1.emit('message', msg);

        client1.on('message', data => {
            console.log(data);
            expect(data).toBeInstanceOf(Object);
            expect(data).toHaveProperty('username');
            expect(data).toHaveProperty('message');
            client1.disconnect();
            done();
        });
    });
});
