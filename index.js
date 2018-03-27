var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');
var countON = 0;
var countPIN = 0;
var control = 0;
var startTime = new Date();

gpio.setup(11, gpio.DIR_OUT);
gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH);


gpio.on('change', function(channel, value) {
  gpio.write(11, value, function(err) { if (err) throw err; });
  if (value) {
    if (control == 0) {
      startTime = new Date();
      countPIN++;
      control = 1;
    }
    countON++;
    console.log('ON ' + countON);
  } else {
    if (control) {
      var timeBob = startTime.getTime();
      console.log('timeBob ' + timeBob);  // milliseconds
      console.log('OFF');
      countON = 0
      control = 0;
    }
  }
  console.log('PINS ' + countPIN);
});

app.listen(3002, function () {
  console.log('Simple LED Control Server Started on Port: 3002!')
});


