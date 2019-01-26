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
    socket.on("sound_alarm", function(msg){
        io.of(beaglebone).emit("sound_alarm", msg)
    })
    socket.on("lock_safe", function(msg){
        io.of(beaglebone).emit("lock_safe", msg)
    })
    socket.on("pong_beaglebone", function(msg){
        io.of(beaglebone).emit("pong_beaglebone", msg)
    })
});

io
.of(beaglebone)
.on('connection', function(socket){
    console.log('a beaglebone connected');

    socket.on("robbery", function(msg){
        io.of(client).emit("robbery", msg);  
    })
    socket.on("fire", function(msg){
        io.of(client).emit("fire", msg);
    })
    socket.on("medical", function(msg){
        io.of(client).emit("medical", msg);
    })
    socket.on("natural", function(msg){
        io.of(client).emit("natural",msg);
    })
    socket.on("cancel_signal", function(msg){
        io.of(client).emit("cancel_signal",msg);
    })
    socket.on("disconnect", function(msg){
        io.of(client).emit("beaglebone_disconnect",msg);
    })   
    socket.on("ping_client", function(msg){
        io.of(client).emit("ping_client",msg);
    })
});

http.listen(8889, function(){
    console.log('listening on *:8889');
});
