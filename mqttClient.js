var mqtt = require('mqtt');
var config = require('./config.js');
var schema = require('./schema.js');

var host = config.mqtt.host;
var port = config.mqtt.port;
var username = config.mqtt.username;
var password = config.mqtt.password;
var topicPrefix = config.mqtt.topic;
var actionDictionary = null;

var client = mqtt.connect({
   host: host,
   port: port,
   clientId: username,
   username: username,
   password: password
});

var executeButtonAction = function(buttonId, callback){
   schema.Remote.findOne({},function(err,remote){
      if(err || !remote)
         callback(err);
      else{
         var actionId = buttonId == 1 ? remote.buttonOneAction : remote.buttonTwoAction;
         schema.Action.findOne({_id:actionId}, function(err,action){
            if(err || !action)
               callback(err);
            else{
               actionDictionary[action.name]();
               callback(null,true);
            }
         });
      }
   });
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
      if(buttonId == 1 || buttonId == 2)
         executeButtonAction(buttonId, function(err,success){
            if(success)
               client.publish(config.mqtt.responseTopic, "true");
         });
   });

}

exports.updateActionDictionary = function(_actionDictionary){
   actionDictionary = _actionDictionary;
}