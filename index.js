var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)


var wss = new WebSocketServer({server: server})
wss.on('connection', function(ws, req) {
  var id = Math.random();
  clients[id] = ws;
  console.log("new connetion " + id);

  ws.on('message', function(message) {
    console.log('get message ' + message);

    for(var key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function() {
    console.log('connection closed ' + id);
    delete clients[id];
  });

});
