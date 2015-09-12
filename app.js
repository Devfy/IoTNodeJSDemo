// NodeJS IoT DeveloperDay 2015
// by Dav Lizarraga @davgeek
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://iot.eclipse.org');

client.on('connect', function () {
  client.publish('developer/day/demo', 'OFF');
});

app.use("/", express.static(path.join(__dirname, 'public')));

app.post('/control', function(req, res){
	var state = req.body.state;
	client.publish('developer/day/demo', state);
	res.json({status:'OK', message:state});
});

app.listen(3150, function(){
	console.log("Corriendo en 3150");
});