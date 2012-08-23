var express = require('express');
var fs = require('fs');
var app =  express.createServer();

// Initialize main server
app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', function(req, res){
  res.render('index');
});


app.get('/view/:room', function(req, res){
  res.render('view', {room: req.params.room});
});

app.get('/broadcast/:room', function(req, res){
  res.render('broadcast', {room: req.params.room});
});


app.listen(8082);


var BinaryServer = require('binaryjs').BinaryServer;
var rooms = {};

// Start Binary.js server
var server = BinaryServer({port: 9000});
// Wait for new user connections
server.on('connection', function(client){
  client.on('stream', function(stream, meta){
    if(meta.type == 'write') {
      rooms[meta.room] = stream;
    } else if (meta.type == 'read' && rooms[meta.room]) {
      rooms[meta.room].pipe(stream);
    }
 });
});
