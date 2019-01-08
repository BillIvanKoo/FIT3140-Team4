var b = require("bonescript")
class LED {
    constructor(ledName) {
        this.name = ledName
        this.state = 0
        b.pinMode(ledName, 'out')
    }
    
    turnOn() {
        this.state = 1
        var this1 = this;
        setInterval(function() {
            b.digitalWrite(this1.name, this1.state)
        }, 15)
    }
}
module.exports = LED