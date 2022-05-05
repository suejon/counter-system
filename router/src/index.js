const WebSocket = require('ws');

const client = new WebSocket('ws://localhost:2345')

// set up web socket server
const wss = new WebSocket.Server({ port: 1234 });
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: [%s] from frontend, and sending to backend', data);
        client.send(data)
    });
    client.on('message', function message(data) {
        console.log('message from backend: [%s]', data)
        ws.send(data)
    })
});