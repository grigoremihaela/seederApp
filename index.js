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
  // var timeEnd = new Date().getMilliseconds() - startTime.getMilliseconds();  // milliseconds (1 ms = 0.001 sec)
  var timeEnd = new Date().getMilliseconds() - startTime.getMilliseconds();
  console.log(timeEnd + ' milliseconds      ' + countPIN + ' total');
  startTime = new Date();
  gpio.write(11, value, function(err) { if (err) throw err; });
  if (value) {
    if (control == 0) {
      // startTime = new Date();
      countPIN++;
      control = 1;
    }
    countON++;
    console.log('ON ' + countON);
  } else {
    if (control) {
      // var timeEnd = new Date().getMilliseconds() - startTime.getMilliseconds();  // milliseconds (1 ms = 0.001 sec)
      // console.log('OFF    ' + timeEnd + ' milliseconds      ' + countPIN + ' total'); 
      console.log('OFF    ' );
      // console.log('start date ' + startTime.getMilliseconds()); 
      // console.log('end date ' + new Date().getMilliseconds()); 
      countON = 0
      control = 0;
    }
  }
});

app.listen(3002, function () {
  console.log('Simple LED Control Server Started on Port: 3002!')
});


