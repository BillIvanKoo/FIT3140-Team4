var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var client = '/client';
var beaglebone = '/beaglebone';

app.get(client, function(req, res){
    res.sendFile(__dirname + '/client.html');
});

io
.of(client)
.on('connection', function(socket){
    console.log('a client connected');
});

io
.of(beaglebone)
.on('connection', function(socket) {
    console.log('a beaglebone connected');
    socket.on('press', function(msg){
        io.of(client).emit('press', msg);
    })
})

http.listen(8889, function(){
    console.log('listening on *:8889');
});