var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');

//gpio.setup(7, gpio.DIR_OUT);
gpio.setup(7, gpio.DIR_IN, readInput);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));

function readInput(err) {
    if (err) throw err;
    gpio.read(7, function(err, value) {
        if (err) throw err;
        console.log('The value is ' + value);
    });
};

app.get('/', function(req, res){ 
    gpio.read(7, function(err, value) {
        if (err) throw err;
        console.log('The value is ' + value);
        return res.render('index', {status: value});
    });
});

/*
app.get('/', function(req, res){ 
  res.render('index',{status:"Press Button To change Status of Led !!"});
});

app.post('/led/on', function(req, res){
gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Written True to pin');
  console.log(path.join(__dirname, 'public'));
  return res.render('index', {status: "Cool!!Led is On"});
    });

});


app.post('/led/off', function(req, res){
gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('Written False to pin');
  console.log(path.join(__dirname, 'public'));
  return res.render('index',{status: "Ohh!! Led is Off"});
    });

});
*/

app.listen(3000, function () {
  console.log('Simple LED Control Server Started on Port: 3000!')
})
