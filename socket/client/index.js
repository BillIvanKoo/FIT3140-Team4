var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var client = '/client';
var beaglebone = '/beaglebone';

app.get(client, function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io
.of(client)
.on('connection', function(socket){
    console.log('a client connected');
    socket.on("ping_beaglebone", function(){
        console.log("ping")
        io.of(beaglebone).emit("ping_beaglebone")
    })
});

io
.of(beaglebone)
.on('connection', function(socket) {
    console.log('a beaglebone connected');
    socket.on("pong_client", function(){
        console.log("pong")
        io.of(client).emit("pong_client");
    })
})

http.listen(8889, function(){
    console.log('listening on *:8889');
});