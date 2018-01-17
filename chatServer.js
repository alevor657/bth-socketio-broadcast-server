var socketio = require('socket.io');

class Chat {
    constructor(server) {
        this.io = socketio(server);
        this.sockets = {};
        this.users = [];
        // todo

        this.onConnection = this.onConnection.bind(this);

        this.io.on('connection', this.onConnection);
    }

    onConnection(socket) {
        console.log('CONNECTION');

        socket.on('new user', this.onNewUser.bind(this, socket));
        socket.on('disconnect', this.onDisconnect.bind(this, socket));
        socket.on('message', this.onMessage.bind(this));
    }

    onMessage(data) {
        console.log('MESSAGE');
        console.log(data);

        data.message.trim();

        if (data.message.substr(0, 3) === '/w ') {
            let msg = data.message.substr(3);

            if (msg.indexOf(' ') !== -1) {
                let recipient = msg.substr(0, msg.indexOf(' '));
                let message = msg.substr(msg.indexOf(' ') + 1);

                data.message = message;
                console.log('EMITTING PM');
                this.sockets[recipient].emit('message', data);
            } else {
                // TODO:
            }
        } else {
            // Save to db

            this.io.sockets.emit('message', data);
        }
    }

    onNewUser(socket, user) {
        // console.log(arguments);
        console.log('NEW USER');
        socket.username = user.username;
        this.users.push({ [user.username]: user });
        this.sockets[user.username] = socket;
        this.io.sockets.emit('update usernames', this._generateUsersArray());
        console.log('Users: ', this.users);
        console.log('Sockets nr:', Object.keys(this.sockets).length);
    }

    onDisconnect(socket) {
        console.log('DISCONNECT');
        this.users = this.users.filter(user => {
            return Object.keys(user)[0] !== socket.username;
        });
        delete this.sockets[this.username];
        this.io.sockets.emit('update usernames', this._generateUsersArray());
        console.log('Users', this.users);
        console.log('Sockets nr:', Object.keys(this.sockets).length);
    }

    _generateUsersArray() {
        return this.users.map(user => Object.values(user)[0]);
    }
}

module.exports = Chat;
