var io = require('socket.io-client')
var should = require('chai').should()
var io = require('socket.io-client');
var socketURL = 'http://localhost:8889';

describe("Simulate Client to Beaglebone signal",function(){
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
          msg.should.equal('lock the safe!')
          bb.disconnect();
          client.disconnect();
          done()
        })
      });
});

describe("Simulation Beaglebone to Client", function() {
    it('Should inform robbery to the client', function(done){
        var bb;
        var client = io.connect(socketURL + '/client');
        client.on('connect', function(data){
          bb = io.connect(socketURL + '/beaglebone');
          bb.on('connect', function() {
            bb.emit("robbery", 'inform the police!');
          })

        });
        client.on("robbery", function(msg){
          msg.should.equal('inform the police!')
          client.disconnect();
          bb.disconnect();
          done()
        })
      });

    it('Should inform fire to the client', function(done){
        var bb;
        var client = io.connect(socketURL + '/client');
        client.on('connect', function(data){
          bb = io.connect(socketURL + '/beaglebone');
          bb.on('connect', function() {
            bb.emit("fire", 'inform the fireman!');
          })

        });
        client.on("fire", function(msg){
          msg.should.equal('inform the fireman!')
          client.disconnect();
          bb.disconnect();
          done()
        })
      });

    it('Should inform medical to the client', function(done){
        var bb;
        var client = io.connect(socketURL + '/client');
        client.on('connect', function(data){
          bb = io.connect(socketURL + '/beaglebone');
          bb.on('connect', function() {
            bb.emit("medical", 'inform the ambulance!');
          })

        });
        client.on("medical", function(msg){
          msg.should.equal('inform the ambulance!')
          client.disconnect();
          bb.disconnect();
          done()
        })
      });

    it('Should inform natural disaster to the client', function(done){
        var bb;
        var client = io.connect(socketURL + '/client');
        client.on('connect', function(data){
          bb = io.connect(socketURL + '/beaglebone');
          bb.on('connect', function() {
            bb.emit("natural", 'inform the authority!');
          })

        });
        client.on("natural", function(msg){
          msg.should.equal('inform the authority!')
          bb.disconnect();
          client.disconnect();
          done()
        })
      });
    
    it('Should inform the client to cancel signal', function(done){
        var bb;
        var client = io.connect(socketURL + '/client');
        client.on('connect', function(data){
          bb = io.connect(socketURL + '/beaglebone');
          bb.on('connect', function() {
            bb.emit("cancel_signal", 'cancel the signal!');
          })

        });
        client.on("cancel_signal", function(msg){
          msg.should.equal('cancel the signal!')
          bb.disconnect();
          client.disconnect();
          done()
        })
    });
});
