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
  
    blinkFast() {
        this.interval = setInterval(() => this.toggleLED(),100);
    }
    
    blinkSlow() {
        this.interval = setInterval(() => this.toggleLED(),1000);
    }

    blinkSlowOnce() {
        b.digitalWrite(this.name, 1)
        setTimeout(() => b.digitalWrite(this.name, 0), 1000)
    }
    
    blinkFastOnce() {
        b.digitalWrite(this.name, 1)
        setTimeout(() => b.digitalWrite(this.name, 0), 100)
    }
    
    blinkSlowOnceFastTwice(){
        this.blinkSlowOnce()
        setTimeout(() => this.blinkFastOnce(), 2000)
        setTimeout(() => this.blinkFastOnce(), 2200)
    }
    
    blinkSlowOnceFastTwiceInterval(){
        this.interval = setInterval(() => this.blinkSlowOnceFastTwice(), 3000)
    }




}

module.exports = LED;