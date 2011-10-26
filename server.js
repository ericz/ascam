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


var nowjs = require('now');

var everyone = nowjs.initialize(app);

nowjs.on('connect', function(){
  console.log(this.user.clientId, 'joined');

});

everyone.now.sendFrame = function(data, room){
  nowjs.getGroup(room).now.receiveFrame(data);
}

everyone.now.joinRoom = function(room) {
  nowjs.getGroup(room).addUser(this.user.clientId);
}