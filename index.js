var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');
var count = 0;
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));

gpio.setup(11, gpio.DIR_OUT);
gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

gpio.on('change', function(channel, value) {
  console.log('Channel ' + channel + ' value is now ' + value);
  gpio.write(11, value, function(err) {
    if (err) throw err;
    //console.log('Written ' + value + ' to pin 11');
  });
  if (value) {count++};
  console.log(count);
});

app.get('/status', function(req, res, next){    
  res.json({
    status: count
  });
});

app.get('/led', function(req, res){ 
  res.render('index',{status:"Press Button To change Status of Led !!"});
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

app.listen(5000, function () {
  console.log('Simple LED Control Server Started on Port: 5000!')
});

