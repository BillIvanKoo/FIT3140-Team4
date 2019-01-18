var initialized = false;
var initializedProcess = false;
var initializedPong = false;
var testCounter = 0;
var clientStartTime;
var testUpdateCounter = 0;
var totalTime = 0;
var listener;
var start;
var ref;
function testListenToBeagle() {
    var ref = firebase.database().ref('testListen');
    ref.on('value', function(snapshot) {
        document.getElementById('listenArea').innerHTML = "Data sent from beaglebone: " + snapshot.val();
    });
}

function writeData(path, value) {
  firebase.database().ref().set({
    beagle: value
  });
}

function readData(path) {
    
    firebase.database().ref(path).once('value').then(function(snapshot) {
      var value = snapshot.val();
      console.log(value);
      // ...
        document.getElementById('readArea').innerHTML = "Read data from beaglebone: " + value;
      return value;
    });
}

function updateData(path, value) {
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().push().key;
    
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[path] = value;
    return firebase.database().ref().update(updates);
}

function testUpdateBeagle(path) {
    //var startTime = new Date();
    start = new Date();
    updateData(path, start)
    
    ref = firebase.database().ref('beagle');
    listener = ref.on('value', onValueChange);
    
}

function onValueChange(snapshot) {
        if (initializedPong == false) {
          initializedPong = true; //Prevent initialization from getting incorrect start time (Initialization also triggers this function).
        } else {
            console.log("Pong received");
            updateCounter('client', start);
        }
    }

function updateCounter(path) {
    var diff = new Date().getTime() - start;
    console.log("diff " + diff);
    totalTime += diff;
    start = new Date();
    updateData(path, start);
    testUpdateCounter += 1;
    if (testUpdateCounter == 100) {
        console.log("Time taken per call: " + totalTime/200);
        ref.off('value', listener);
        testUpdateCounter = 0;
        return;
    }
}
    

