var express = require('express');
var app = express();
var server = require('http').Server(app);
var mongoose = require('mongoose');
var io = require('socket.io')(server);
var config = require('./config.js');
var mqttClient = require('./mqttClient.js');
var actionParser = require('./actionParser.js');
var actionAPI = require('./api/action.js');
var remoteAPI = require('./api/remote.js');
var bodyParser = require('body-parser')
var actionDictionary = null;

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

server.listen(app.get('port'));
var mongooseURI = process.env.MONGOLAB_URI || 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database
mongoose.connect(mongooseURI);

var models = require('./schema.js');

app.get('/api/actions', function (req,res){
    actionAPI.getAllActions(function(err,actions){
        if(err)
            res.send(err);
        else 
            res.send(actions);
    })
});

app.get('/api/buttonConfig', function(req,res){
    remoteAPI.getButtonConfig(function(err,config){
        if (err)
            res.send(err);
        else
            res.send(config);
    })
});

app.post('/api/buttonConfig', function(req,res){
    remoteAPI.saveButtonConfig(req.body, function(err,success){
        if(err){
            console.log(err);
            res.send(err);
        }
        else {
            res.send(success);
        }
    });
});

actionParser.parseActions(function(_actionDictionary){
    actionDictionary = _actionDictionary;
    console.log(actionDictionary);
    mqttClient.updateActionDictionary(actionDictionary, function(){
        mqttClient.connectMQTT();
    });
});

//all other routes should default to angular router
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/app/index.html');
});


