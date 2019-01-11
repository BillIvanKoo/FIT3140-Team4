# FIT3140-Team4

| Github      | Student ID | Student email |
| ----------- | ---------- | ------------- |
| BillIvanKoo |   28694120 |      bkoo0001 |
| thestch     |   27731138 |        scteo6 |
| wtan0031    |   29611393 |      wtan0031 |
| sriharan123 |   26539608 |        shar88 |

# Iteration 1
Micro Controller button can be pressed and the LED will respond corresponding to the press type.

| Press Type | LED Respond |
| ---------- | ----------- |
| Single Click | Turn On |
| Single Hold | Turn Off |
| Double Click | Fast Blink |
| Double Hold | Slow Blink |
| Hold + Click | Slow + Fast Blink |
| Click + Hold | Slow Blink Once then Fast Blink Twice |

LED has to be turned off first ( hold has to be registered first ) before registering another blink command.
This is to simulate that ground staff has to cancel the initial emergency call first before changing the emergency type.

### Files Added
* LED.js = the module for LED
* index.js = main driver file
