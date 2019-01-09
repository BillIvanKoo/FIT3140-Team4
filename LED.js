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

    toggleLED() {
        this.state = this.state ? 0: 1;
        b.digitalWrite(this.name, this.state);
    }
    
    blinkSlow() {
        var timer = setInterval(() => this.toggleLED(),700);
        setTimeout(() => clearInterval(timer),4900);
        setTimeout(() => this.turnOff(), 5010);
    }

    blinkSlowOnce() {
        var timer = setInterval(() => this.toggleLED(),900);
        setTimeout(() => clearInterval(timer),1990);
        setTimeout(() => this.turnOff(), 2200);
    }
    
    blinkFastTwice() {
        var timer = setInterval(() => this.toggleLED(),450);
        setTimeout(() => clearInterval(timer),1990);
        setTimeout(() => this.turnOff(), 2200);
    }
    
    blinkSlowOnce_FastTwice(){
        this.blinkSlowOnce()
        setTimeout(() => this.blinkFastTwice(), 2500);
    }

}

module.exports = LED;