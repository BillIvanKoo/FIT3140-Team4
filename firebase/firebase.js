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
var initialized = false;
updateData("testListen", "ok");
listenClientData('client'); //Client test starting time.

//testUpdateClient('beagleStart');
function updateData(path, value) {
    // Get a key for a new Post.

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[path] = value;
    return firebase.database().ref().update(updates);
}

function writeData(path, value) {
  firebase.database().ref().set({
    beagle: value
  });
}
function readData(path) {
    
    firebase.database().ref(path).once('value').then(function(snapshot) {
      var value = snapshot.val();
      // ...
      return value;
    });
}

function listenClientData(path) {
    var ref = firebase.database().ref(path);
    ref.on('value', function(snapshot) {
      if (initialized == false) {
        initialized = true; //Prevent initialization from getting incorrect start time (Initialization also triggers this function).
        console.log("Initialized");
      }
      else {
        console.log("client: " + snapshot.val());
        updateData('beagle', new Date());
        
        //calculateTime(clientStartTime);
      }
    });
}

