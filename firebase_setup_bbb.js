var b = require('bonescript');

var firebase = require("./node_modules/firebase");

// Add additional services that you want to use
require("firebase/database");


var config = {
    apiKey: "AIzaSyDgHXzLlrcCwUfWmS5CLz9m0K7d-ykInm8",
    authDomain: "fit3140-45cf1.firebaseapp.com",
    databaseURL: "https://fit3140-45cf1.firebaseio.com",
    projectId: "fit3140-45cf1",
    storageBucket: "fit3140-45cf1.appspot.com",
    messagingSenderId: "589857769061"
  };
var app = firebase.initializeApp(config);
var database = app.database();
