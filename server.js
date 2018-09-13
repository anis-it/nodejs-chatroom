var http = require('http');
var fs = require('fs');
var express = require('express');
var ent = require('ent')

var app = express();
var server = http.Server(app);

// on charge la page html index
app.get('/', function(req, res) {
    fs.readFile('index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);

})});

// chargement de socket.io
var io = require('socket.io').listen(server);

// on gère ici la connexion en temps reel
io.sockets.on('connection', function (socket) {
    
    ///quand un client se connecte avec son pseudo, on informe les autres users du chat
    socket.on('new joiner', function (pseudo){
        socket.broadcast.emit('new joiner', ent.encode(pseudo) );
    })

    ///quand un client envoi un message on l'envoi à tout le monde
    socket.on('chat message', function ({pseudo, message}){
            io.emit('chat message', {pseudo : ent.encode(pseudo), message: ent.encode(message)} );
    })
})

server.listen(8080);