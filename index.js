const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let messages = [];
let connections = [];

const TEXT_T = 0;

wss.on('connection', function connection(ws) {
  connections.push(ws);
  ws.on('message', function incoming(message) {
    let json, error = false
    try {
      json = JSON.parse(message);
      if (!json.user || !json.data || !json.type) {
        error = true;
      }
    } catch (e) {
      error = true;
    }
    if (error) {
      ws.send(JSON.stringify({error: 'Bad message'}));
      return;
    }
    messages.push(json);
    for (conn of connections) {
      conn.send(message);
    }
  });
});
