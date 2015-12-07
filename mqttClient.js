var mqtt = require('mqtt');
var config = require('./config.js')

var host = config.mqtt.host;
var port = config.mqtt.port;
var username = config.mqtt.username;
var password = config.mqtt.password;
var topicPrefix = config.mqtt.topic;

var client = mqtt.connect({
   host: host,
   port: port,
   clientId: username,
   username: username,
   password: password
});

var handleButton = function(buttonId){
   
}

exports.pressButton = function(buttonId){
  client.publish(topicPrefix, buttonId.toString());
}

exports.connectMQTT = function(req, res) {
   console.log("Connecting to Broker");
   client.on('connect', function() {
      console.log("Connected");
      client.subscribe(topicPrefix);

      }, function(err) {
         console.log(err);
   });

   client.on('message', function(topic, buttonId) {
      console.log('Topic: ' + topic + ' Message: ' + buttonId);
      handleButton(buttonId)
   });

}