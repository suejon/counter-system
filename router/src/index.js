const WebSocket = require('ws');

server_port = process.env.SERVER_PORT || 1234
backend_port = process.env.BACKEND_PORT || 2345
backend_hostname = process.env.BACKEND_HOSTNAME

console.log('Setting up websocket connection to backend')
const client = new WebSocket(`ws://${backend_hostname}:${backend_port}`)

console.log('Setting up websocket server')
// set up web socket server
const wss = new WebSocket.Server({ port: server_port });
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