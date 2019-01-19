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


# Iteration 2
Spiking for communication between App and Client, using Socket.IO and Firebase Realtime Database

### Folders Added
* firebase = firebase spike folder
* socket = socket.io spike folder

### How to spike Firebase
1. Go to firebase folder.
2. Run index.html in your browser.
3. Copy firebase.js to beaglebone, install its dependency
```bash
npm install firebase
```
4. Run firebase.js in beaglebone.
5. In the client, click *Test transfer speed* button
6. After some time, average ping result will be logged in ms (Ctrl+Shift+I)

### How to spike Socket.IO
1. Go to socket folder.
```bash
cd client
npm install
node index.js
```
2. Copy app folder to beaglebone.
```bash
cd app
npm install
node index.js
```
3. Access [http://localhost:8889/client](http://localhost:8889/client) in browser, click *Start Ping* button
4. After some time, average ping result will be logged in ms (Ctrl+Shift+I)
