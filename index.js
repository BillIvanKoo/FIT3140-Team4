//API for microcontroller actions.
var b = require('bonescript');

//Input button.
var inputButton = 'P8_19';

//Output LED.
var outputLed = 'P8_13';

//Duration before only registering first input.
var debounceDuration = 350;

//Array for inputs, can have different permutations of click and hold.
var arrayInputs = [];

//Time at the start of button press.
var startTime;

//Pressed state.
var pressed = false;

//Duration of button press.
var pressTime;

//Time at the start of letting go of the button.
var debounceTimeStart = null;

//Importing the LED module.
var LED = require("./LED.js");

//LED module instance.
var ledFunctions;

//Main starts here.
ledFunctions = new LED(outputLed);
b.pinMode(inputButton, b.INPUT);
setInterval(check,20);

/*
    Callback for listening of button press.
*/
function check(){
    b.digitalRead(inputButton, checkButton);
}

/*
    LED functionalities for one input registered.
*/
function checkOneInput(arrayInputs) {
     if (arrayInputs[0] == "click") {
         b.digitalWrite(outputLed, b.HIGH);
      } else {
          console.log("closed");
         b.digitalWrite(outputLed, b.LOW);
         ledFunctions.turnOff();
     }
}

/*
    LED functionalities for two inputs registered.
*/
function checkTwoInputs(arrayInputs) {
    switch (arrayInputs[0]) {
        case "click":
            switch (arrayInputs[1]) {
                case "click":
                    ledFunctions.blinkFast();
                    break;
                    
                case "hold":
                    ledFunctions.blinkSlowOnceFastTwiceInterval();
                    break;
            }
            break;
        case "hold":
            switch (arrayInputs[1]) {
                case "click":
                    ledFunctions.blinkSlowFastInterval();
                    break;
                    
                case "hold":
                    ledFunctions.blinkSlow();
                    break;
            }
            break;
            
        
    }
}

/*
    Listens for button press input and generates the outputs specified based on input pattern.
*/
function checkButton(x) {
     if(x.value == 1){
        if (pressed == false) {
            startTime = new Date();
        }
        pressed = true;
    }
    else{
        if (pressed == true) { //Just let go.
            pressed = false;
            debounceTimeStart = new Date();
            pressTime = new Date() - startTime;
            if (pressTime > 500) {
                arrayInputs.push("hold");
            }
            else {
                arrayInputs.push("click");
            }
    
            if (arrayInputs.length == 2) {
                //console.log(arrayInputs + " Two");
                if (ledFunctions.interval == null) {
                    checkTwoInputs(arrayInputs);
                }
                arrayInputs = [];
            }
            
        }
        else if (new Date() - debounceTimeStart > 350 && arrayInputs.length == 1) {
            checkOneInput(arrayInputs);
            //console.log(arrayInputs);
            arrayInputs = [];
        }
        
    }
}

