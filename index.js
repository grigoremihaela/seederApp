var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');

gpio.setup(11, gpio.DIR_OUT);
gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH);

gpio.on('change', function(channel, value) {
  console.log('Channel ' + channel + ' value is now ' + value);
  gpio.write(11, value, function(err) {
        if (err) throw err;
        console.log('Written " + value + " to pin 11');
    });
});


