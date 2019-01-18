var io = require("socket.io-client");
var socket = io.connect('http://192.168.7.1:8889/beaglebone');

socket.on('connect', function() {
    console.log('connected')
    socket.on("ping_beaglebone", function(){
        socket.emit("pong_client");
    })
})

