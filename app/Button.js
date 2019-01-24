//API for microcontroller actions.
var b = require("bonescript")

/*
    Class for button input.
    Listens for input from button and outputs the combination.
*/
class Button {
    constructor(inputButton, outputLed, socketFunctions) {
        this.inputButton = inputButton; //Input button.
        this.outputLed = outputLed; //Output LED.
        this.socketFunctions = socketFunctions; //Socket object.
        this.debounceDuration = 350; //Duration before only registering first input.
        this.arrayInputs = []; //Array for inputs, can have different permutations of click and hold.
        this.startTime = null; //Time at the start of button press.
        this.pressed = false; //Pressed state.
        this.pressTime = null; //Duration of button press.
        this.debounceTimeStart = null; //Time at the start of letting go of the button.
        b.pinMode(inputButton, b.INPUT);
    }
    
    /*
        Initialize interval of input check for button.
    */
    intervalInit(interval) {
        setInterval(this.check.bind(this), interval);
    }
    
    /*
        Callback for listening of button press.
    */
    check(){
        b.digitalRead(this.inputButton, this.checkButton.bind(this));
    }
    
    /*
        LED functionalities for one input registered.
    */
    checkOneInput(arrayInputs) {
         if (arrayInputs[0] == "click") {
            this.socketFunctions.emitToServer("robbery")
          } else {
            console.log("closed");
            this.socketFunctions.emitToServer("cancel_signal")
         }
    }
    
    /*
        LED functionalities for two inputs registered.
    */
    checkTwoInputs(arrayInputs) {
        switch (arrayInputs[0]) {
            case "click":
                switch (arrayInputs[1]) {
                    case "click":
                        this.socketFunctions.emitToServer("medical")
                        break;
                        
                    case "hold":
                        console.log("No actions set for this combination")
                        break;
                }
                break;
            case "hold":
                switch (arrayInputs[1]) {
                    case "click":
                        this.socketFunctions.emitToServer("fire");
                        break;
                        
                    case "hold":
                        this.socketFunctions.emitToServer("natural");
                        break;
                }
                break;
                
            
        }
    }
    
    /*
        Listens for button press input and generates the outputs specified based on input pattern.
    */
    checkButton(x) {
         if(x.value == 1){
            if (this.pressed == false) {
                this.startTime = new Date();
            }
            this.pressed = true;
        }
        else{
            if (this.pressed == true) { //Just let go.
                this.pressed = false;
                this.debounceTimeStart = new Date();
                this.pressTime = new Date() - this.startTime;
                if (this.pressTime > 500) {
                    this.arrayInputs.push("hold");
                }
                else {
                    this.arrayInputs.push("click");
                }
        
                if (this.arrayInputs.length == 2) {
                    //console.log(arrayInputs + " Two");
                    this.checkTwoInputs(this.arrayInputs);
                    
                    this.arrayInputs = [];
                }
                
            }
            else if (new Date() - this.debounceTimeStart > this.debounceDuration && this.arrayInputs.length == 1) {
                this.checkOneInput(this.arrayInputs);
                //console.log(arrayInputs);
                this.arrayInputs = [];
            }
            
        }
    }

}

module.exports = Button;