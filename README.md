# Socketio broadcast server

This is a simple chat/broadcast server built with socket.io

## Usage

    import Server from 'bth-socketio-chat'
    ...
    // You must set a port
    new Server(port)
    // Aaaand its running

I am not going to describe events just because you are not going to use this package. And you should not, believe me.
## Testing

    npm test

## Environment

You can set DBWEBB_SOCKETIO_PORT to test server on whatever port you like. Defaults to 1340 otherways.
