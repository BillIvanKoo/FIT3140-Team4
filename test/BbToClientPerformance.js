var b = require("bonescript") //API for microcontroller actions.
var io = require("socket.io-client");
var socket = io.connect('http://192.168.7.1:8889/beaglebone');
var inputButton = 'P8_19';
var ping_count = 0;
var time_start;
var pressed = false;
var busy = false;
testPerformance();
setInterval(check, 20);

/*
    Testing performance of beaglebone communication to client via socket server.
*/
function testPerformance() {

    socket.on("pong_beaglebone", function() {
        if (ping_count == 100) {
            var time_end = new Date()
            var time_taken = time_end - time_start
            // average time is divided by 200, to get one way communcation speed
            var avg_time = time_taken / 200
            console.log(avg_time);
            pressed = false;
            busy = false;
        } else {
            socket.emit("ping_client");
            ping_count++;
        }
    })

    
}

/*
    Callback for listening of button press.
*/
function check(){
    b.digitalRead(inputButton, checkButton);
}

function checkButton(x) {
  if(x.value == 1){
      pressed = true;
  } else {
      if (pressed && !busy) {
        console.log("ping started")
        time_start = new Date()
        socket.emit("ping_client")
        ping_count = 1
        pressed = false;
        busy = true;
      }
  }
}