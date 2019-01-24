//Input button.
var inputButton = 'P8_19';

//Output LED.
var outputLed = 'P8_13';

//Importing the LED module.
var LED = require("./LED.js");

//Button class.
var Button = require("./Button.js");

//Socket class for beaglebone.
var SocketFunctions = require("./SocketFunctions.js");

//Button instance.
var button;

//LED module instance.
var ledFunctions = new LED(outputLed);

//Socket functionalities.
var socketFunctions = new SocketFunctions(ledFunctions);

//Main starts here.
button = new Button(inputButton, outputLed, socketFunctions);
button.intervalInit(20);






