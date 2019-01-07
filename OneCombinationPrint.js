var b = require('bonescript');

var inputButton = 'P8_19';
var outputButton = 'P8_13';
var debounceDuration = 350;
var arrayInputs = [];
var startTime;
var pressed = false;
var pressTime;
var debounceTimeStart = null;
var debounceTime;

b.pinMode(inputButton, b.INPUT);
b.pinMode(outputButton, b.OUTPUT);
setInterval(check,20);
function check(){
    b.digitalRead(inputButton, checkButton);
}

function checkButton(x) {
     if(x.value == 1){
        if (pressed == false) {
            startTime = new Date();
        }
        pressed = true;
        b.digitalWrite(outputButton, b.HIGH);
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
    

            
        }
        else if (new Date() - debounceTimeStart > 350 && arrayInputs.length == 1) {
            console.log(arrayInputs);
            arrayInputs = [];
        }
        
        b.digitalWrite(outputButton, b.LOW);
    }
}

