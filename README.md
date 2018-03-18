# raspberry-temp-sensor

This project was built with [Nodejs](https://nodejs.org) , [Raspberrypi](https://www.raspberrypi.org/) and DS18B20 digital temperature sensor.

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/grigoremihaela/raspberry-temp-sensor/blob/master/README.md).

## Table of Contents

- [Installing Raspbian](#installing-raspbian)
- [Set Raspberry](#set-raspberry)
- [Forever Package](#package-forever)
- [Raspberry-temp-sensor app](#raspberry-temp-sensor-app)
- [Pi-temp-api app](#pi-temp-api-app)


## Installing Raspbian

First install raspbian on raspberry pi.(https://www.raspberrypi.org/documentation/raspbian/)


## Set Raspberry 

In terminal `sudo nano crontab -u pi -e` and add at the end

```
@reboot sudo modprobe w1-gpio && sudo modprobe w1-therm && sudo dtoverlay w1-gpio gpiopin=4 pullup=0 && sudo dtoverlay w1-gpio gpiopin=27 pullup=0

```

## Forever Package

* Install Forever Package(https://www.npmjs.com/package/forever) 
* In terminal `sudo nano crontab -u pi -e` and add at the end

```
@reboot /usr/bin/sudo -u pi -H /usr/local/bin/forever start /home/pi/app/raspberry-temp-sensor/index.js

```

## Raspberry-temp-sensor 

Build `raspberry-temp-sensor`, a nodejs app, using node-w1temp for read the sensors.(https://github.com/kolarcz/node-w1temp)


## Pi-temp-api app 

Build `pi-temp-api app`, a nodejs app, for request api from `raspberry-temp-sensor` and saving to data base.




