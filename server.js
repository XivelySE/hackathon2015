var express = require('express');
var app = express();
var server = require('http').Server(app);
var mongoose = require('mongoose');
var io = require('socket.io')(server);
var config = require('./config.js');
var mqttClient = require('./mqttClient.js');
var actionParser = require('./actionParser.js');

var actionDictionary = null;

app.set('port', (process.env.PORT || 6000));

server.listen(app.get('port'));
var mongooseURI = process.env.MONGOLAB_URI || 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database
mongoose.connect(mongooseURI);

var models = require('./schema.js');

//mqttClient.connectMQTT();



actionParser.parseActions(function(_actionDictionary){
    console.log("Actions parsed");
    actionDictionary = _actionDictionary;
    console.log(actionDictionary);
});

var testFunction = function(){
    models.Remote.findOne({}, function(err,remote){
        remote.buttonOneAction =  mongoose.Schema.Types.ObjectId("5666433eb6de3a681a570cfe");
        remote.save();
    });
}()


app.use(express.static(__dirname + '/public'));

//add api routes first


//all other routes should default to angular router
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/app/index.html');
});


