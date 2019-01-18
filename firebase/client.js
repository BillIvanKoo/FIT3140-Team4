function listenData(path) {
    var ref = firebase.database().ref(path);
    ref.on('value', function(snapshot) {
      document.getElementById('listenArea').innerHTML = "Date received from beaglebone: " + snapshot.val();
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