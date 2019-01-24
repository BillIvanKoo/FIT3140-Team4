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
});

io
.of(beaglebone)
.on('connection', function(socket){
    console.log('a beaglebone connected');
    socket.on("robbery", function(){
        io.of(client).emit("robbery");
    })
    socket.on("fire", function(){
        io.of(client).emit("fire");
    })
    socket.on("medical", function(){
        io.of(client).emit("medical");
    })
    socket.on("natural", function(){
        io.of(client).emit("natural");
    })
    socket.on("cancel_signal", function(){
        io.of(client).emit("cancel_signal");
    })
    socket.on("disconnect", function(){
        io.of(client).emit("beaglebone_disconnect");
    })
});

http.listen(8889, function(){
    console.log('listening on *:8889');
});