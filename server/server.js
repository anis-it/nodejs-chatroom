var http = require('http');
var fs = require('fs');


// Chargement du fichier index.html affiché au client

var server = http.createServer(function(req, res) {
    fs.readFile('../client/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(fs)
        res.end(content);
    });
});

server.listen(8080);