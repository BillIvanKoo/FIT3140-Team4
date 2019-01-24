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

# Iteration 3
Version 1.0 of the product. </br>
Implemented Web UI for response team and Beaglebone app for Ground staff.

### How to run the program
#### For Beaglebone
1. Copy the app folder to beaglebone
2. Install dependency
```bash
cd app
npm install socket.io-client
```
3. Run index.js
```bash
node index.js
```

#### For Client
1. Install dependencies
```bash
cd client
npm install
```
2. Start the server
```bash
npm run socket
```
3. In a new terminal, run the client, it will open in [http://localhost:8080/](http://localhost:8080/)
```bash
npm run dev
```

### Repository Structure
```bash
.
├── app (for beaglebone)
│   ├── Button.js (Button class)
│   ├── index.js (Driver)
│   ├── LED.js (LED class)
│   └── SocketFunctions.js (functions for socket)
├── client
│   ├── index.js (the socket server)
│   └── src (folder for the web ui)
│       ├── App.vue
│       ├── assets (static assets)
│       │   └── logo.png
│       ├── components
│       │   ├── HeaderLogo.vue
│       │   ├── ResponseToolbar.vue
│       │   ├── WarningCard.vue
│       │   └── WarningList.vue
│       ├── index.html (html template)
│       └── index.js (entry file)
├── package.json (dependencies and scripts)
├── package-lock.json
├── README.md (documentation)
├── test (test folder)
│   └── test.js
└── webpack.config.js (webpack config file)
```
