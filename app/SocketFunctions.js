/*
    Class for all socket functions in beaglebone side to communicate with server and client.
*/
class SocketFunctions {
    constructor(ledFunctions) {
        this.io = require("socket.io-client");
        this.socket = this.io.connect('http://192.168.7.1:8889/beaglebone');
        this.initListeners();
        this.ledFunctions = ledFunctions;

    }
    
    /*
        Emit signal to beaglebone namespace.
    */
    emitToServer(key) {
        if (this.socket.connected) {
            console.log("Emitting key: " + key)
            this.socket.emit(key);
        }
    }
    
    /*
        Initialize listeners in beaglebone namespace.
    */
    initListeners() {
        this.socket.on('connect', function() {
            console.log('client connected');
            //Sound alarm.
            this.socket.on("sound_alarm", function(){
                console.log("sounding alarm");
                this.ledFunctions.turnOff();
                this.ledFunctions.blinkFast();
            }.bind(this))
            //Lock safe.
            this.socket.on("lock_safe", function(){
                console.log("locking safe");
                this.ledFunctions.turnOff();
                this.ledFunctions.turnOn();
            }.bind(this))
			//Latency checking
			this.socket.on("latency_ping", function(msg) {
				this.socket.emit("latency_pong", msg);
			})
        }.bind(this))
    }
}

module.exports = SocketFunctions;