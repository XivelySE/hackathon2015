var Action = require('./schema').Action;
var fs = require('fs');
var path = require('path');
var actionLookup = {};

var saveActionToDb = function(name, desc){
    console.log(name + ': ' + desc);
    new Action({
        name:name,
        description: desc
    }).save();
}

//Delete all old actions, then repopulate database
var parseActions = function(callback){
    fs.readdir('./actions', function(err,files){
        if(files && files.length > 0){
            for (i in files){
                console.log('Loading module: ' + path.join(__dirname +'/actions/',files[i]));
                var actionModule = require(path.join(__dirname+'/actions/',files[i]));
                actionLookup[actionModule.name] = actionModule.execute;
                saveActionToDb(actionModule.name, actionModule.description);
            }
        }
    });
    console.log(actionLookup);
    callback(actionLookup);
}

exports.parseActions = parseActions;