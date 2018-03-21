var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));

gpio.setup(11, gpio.DIR_OUT);
gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH);

app.get('/', function(req, res){ 
  res.render('index',{status:"Press Button To change Status of Led !!"});
});

gpio.on('change', function(channel, value) {
  console.log('Channel ' + channel + ' value is now ' + value);
  gpio.write(11, value, function(err) {
    if (err) throw err;
    console.log('Written ' + value + ' to pin 11');
  });
  document.getElementById('status').innerHTML = value;
  /*
  app.post('/', function(req, res){ 
 	  return res.render('index',{status: value});
  });
  */
});

app.post('/led/on', function(req, res){
  gpio.write(11, true, function(err) {
        if (err) throw err;
        console.log('Written True to pin');
	console.log(path.join(__dirname, 'public'));
	return res.render('index', {status: "Cool!!Led is On"});
    });

});

app.post('/led/off', function(req, res){
  gpio.write(11, false, function(err) {
        if (err) throw err;
        console.log('Written False to pin');
	console.log(path.join(__dirname, 'public'));
	return res.render('index',{status: "Ohh!! Led is Off"});
    });

});

app.listen(3000, function () {
  console.log('Simple LED Control Server Started on Port: 3000!')
});


