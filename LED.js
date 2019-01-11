//API for microcontroller actions.
var b = require("bonescript")

/*
    Class for LED output.
    Interface for all special LED functionalities.
*/
class LED {
    constructor(ledName) {
        
        //LED name.
        this.name = ledName
        
        //State of LED, 0 for off, 1 for on.
        this.state = 0
        
        //Interval for blinking.
        this.interval = null
        
        //Set pin mode for LED output.
        b.pinMode(ledName, 'out')
    }

    /*
        Turn off the LED and clears the interval so that new intervals can be added.
    */
    turnOff() {
        var this1 = this
        if (this.interval != null) {
            this.state = 0
            clearInterval(this1.interval)
            this.interval = null
        }
    }
	
    /*
        Toggles LED automatically and switches state from 0 to 1, vice versa.
    */
    toggleLED() {
        this.state = this.state ? 0: 1;
        b.digitalWrite(this.name, this.state);
    }
  
    /*
        Fast blinking functionality (100ms)
    */     
    blinkFast() {
        this.interval = setInterval(() => this.toggleLED(),100);
    }
    
    /*
        Slow blinking functionality. (1s)
    */
    blinkSlow() {
        this.interval = setInterval(() => this.toggleLED(),1000);
    }

    /*
        Blink slow once. (1s)
    */
    blinkSlowOnce() {
        b.digitalWrite(this.name, 1)
        setTimeout(() => b.digitalWrite(this.name, 0), 1000)
    }
    
    /*
        Blink fast once. (100ms)
    */
    blinkFastOnce() {
        b.digitalWrite(this.name, 1)
        setTimeout(() => b.digitalWrite(this.name, 0), 100)
    }
    
    /*
        Blink slow once (1s), then after 1s, fast once (100ms).
    */
    blinkSlowFast() {
        this.blinkSlowOnce();
        setTimeout(() => this.blinkFastOnce(), 2000);
    }
    
    /*
        Repeat the blinkSlowFast() process every 3s.
    */
    blinkSlowFastInterval() {
        this.interval = setInterval(() => this.blinkSlowFast(), 3000)
    }
	
    /*
        Blink slow once (1s), then after 1s, fast once (100ms), then after 100ms, fast once (100ms).
    */
    blinkSlowOnceFastTwice(){
        this.blinkSlowOnce()
        setTimeout(() => this.blinkFastOnce(), 2000)
        setTimeout(() => this.blinkFastOnce(), 2200)
    }
    
    /*
        Repeat the blinkSlowOnceFastTwice() process every 3s.
    */
    blinkSlowOnceFastTwiceInterval(){
        this.interval = setInterval(() => this.blinkSlowOnceFastTwice(), 3000)
    }




}

module.exports = LED;