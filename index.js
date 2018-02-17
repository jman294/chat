const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let messages = [];
let connections = [];

wss.on('connection', function connection(ws) {
  connections.push(ws);
  ws.on('message', function incoming(message) {
    let json = JSON.parse(message)
    messages.push(json.data);
    for (ws of connections) {
      ws.send(json.data)
    }
  });
});
