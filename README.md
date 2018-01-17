[![Build Status](https://travis-ci.org/alevor657/socketio-chat-server.svg?branch=master)](https://travis-ci.org/alevor657/socketio-chat-server)
[![Code Coverage](https://scrutinizer-ci.com/g/alevor657/socketio-chat-server/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/alevor657/socketio-chat-server/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/alevor657/socketio-chat-server/badges/build.png?b=master)](https://scrutinizer-ci.com/g/alevor657/socketio-chat-server/build-status/master)

# Socketio chat server

This is a simple chat server built with socket.io

## Usage

    import Chat from 'socketio-chat-server'
    ...
    // You must set a port
    new Chat(require('http').createServer().listen(port))
    // Aaaand its running

### Chat listens to emits of type:

- waits for: 'new user' - you can pass your user data here
emits: 'update usernames' and passes all usernames to clients

- waits for: 'disconnect'
emits: 'update usernames' and passes all usernames to clients

- waits for: 'message' - you can pass your user data here
emits: 'message' and passes message to clients OR if you add /w ${username} ${message} it will emit only to one user specified as ${username}

## Testing

    npm test

## Environment

You can set DBWEBB_SOCKETIO_PORT to test server on whatever port you like. Defaults to 1340 otherways.
