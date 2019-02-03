var io = require('socket.io-client')
var should = require('chai').should()
var io = require('socket.io-client');
var socketURL = 'http://localhost:8889';

describe("Simulation Client to Beaglebone",function(){
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

describe("Simulation Latency", function(){
  it('Should ping to beaglebone', function(done){
    var client;
    var beaglebone = io.connect(socketURL + '/beaglebone');
    var time = new Date()
    beaglebone.on('connect', function(){
      client = io.connect(socketURL + '/client');
      client.on('connect', function(){
        client.emit("latency_ping", { time: time });
      })
    })
    beaglebone.on("latency_ping", function(msg){
      new Date(msg.time).getTime().should.equal(time.getTime())
      client.disconnect();
      beaglebone.disconnect();
      done();
    })
  })

  it('Should pong to client', function(done){
    var beaglebone;
    var client = io.connect(socketURL + '/client');
    var time = new Date()
    client.on('connect', function(){
      beaglebone = io.connect(socketURL + '/beaglebone');
      beaglebone.on('connect', function(){
        beaglebone.emit("latency_pong", { time: time });
      })
    })
    client.on("latency_pong", function(msg){
      new Date(msg.time).getTime().should.equal(time.getTime())
      beaglebone.disconnect();
      client.disconnect();
      done();
    })
  })
})