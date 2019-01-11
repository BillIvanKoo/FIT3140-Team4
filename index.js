var b = require('bonescript');

var inputButton = 'P8_19';
var outputLed = 'P8_13';
var debounceDuration = 350;
var arrayInputs = [];
var startTime;
var pressed = false;
var pressTime;
var debounceTimeStart = null;
var debounceTime;
var LED = require("./LED.js");
var ledFunctions;


ledFunctions = new LED(outputLed);
b.pinMode(inputButton, b.INPUT);
setInterval(check,20);
function check(){
    b.digitalRead(inputButton, checkButton);
}


function checkOneInput(arrayInputs) {
     if (arrayInputs[0] == "click") {
         b.digitalWrite(outputLed, b.HIGH);
      } else {
          console.log("closed");
         b.digitalWrite(outputLed, b.LOW);
         ledFunctions.turnOff();
     }
}

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

