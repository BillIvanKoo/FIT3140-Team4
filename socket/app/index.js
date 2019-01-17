var io = require("socket.io-client");
var socket = io.connect('http://192.168.7.1:8889/beaglebone');

socket.on('connect', function(socket) {
    var interval = setInterval(sendPress, 50);
    setTimeout(function(){ clearInterval(interval)}, 5000);
})

function sendPress(){
    socket.emit('press', {
        time: new Date()
    })
}