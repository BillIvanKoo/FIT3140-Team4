var b = require("bonescript")

class LED {
    constructor(ledName) {
        this.name = ledName
        this.state = 0
        this.interval = null
        b.pinMode(ledName, 'out')
    }
    
    turnOn() {
        this.state = 1
        var this1 = this;
        this.interval = setInterval(function() {
            b.digitalWrite(this1.name, this1.state)
        }, 15)
    }
    
    turnOff() {
        var this1 = this
        if (this.interval != null) {
            this.state = 0
            clearInterval(this1.interval)
            this.interval = null
        }
    }
	
	blinkFast() {
        var this1 = this
        this.interval = setInterval(function() {
                this1.state = this1.state ? 0:1;
                b.digitalWrite(this1.name, this1.state)
            },100);
    }
}

module.exports = LED;