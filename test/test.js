var io = require('socket.io-client')
var should = require('chai').should()
var io = require('socket.io-client');
var socketURL = 'http://localhost:8889';

describe("Socket Server",function(){
    it('Should sound alarm at beaglebone', function(done){
        var client;
        var bb = io.connect(socketURL + '/beaglebone');
        bb.on('connect', function(data){
          client = io.connect(socketURL + '/client');
          client.on('connect', function() {
            client.emit("sound_alarm", 'sound the alarm!');
          })

        });
        bb.on("sound_alarm", function(msg){
          console.log(msg);
          msg.should.equal('sound the alarm!')
          bb.disconnect();
          client.disconnect();
          done()
        })
      });

    it('Should lock the safe', function(done){
        var client;
        var bb = io.connect(socketURL + '/beaglebone');
        bb.on('connect', function(data){
          client = io.connect(socketURL + '/client');
          client.on('connect', function() {
            client.emit("lock_safe", 'lock the safe!');
          })

        });
        bb.on("lock_safe", function(msg){
          console.log(msg);
          msg.should.equal('lock the safe!')
          bb.disconnect();
          client.disconnect();
          done()
        })
      });
});
