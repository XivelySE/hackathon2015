var schema = require('../schema.js');

exports.saveButtonConfig = function(buttonConfig, callback){
    schema.Remote.findOne({}, function(err,remote){
        if(err)
            callback(err);
        else if(!err && !remote){
            remote = new Remote({"buttonOneAction":null, "buttonTwoAction": null});
        }
        else
        {
            remote.buttonOneAction = buttonConfig.buttonOneAction;
            remote.buttonTwoAction = buttonConfig.buttonTwoAction;
            remote.save();
        }
        callback(null, true);
    });
}

exports.getButtonConfig = function(callback){
    schema.Remote.findOne({}, function(err,remote){
        if(err)
            callback(err);
        else {
            if(!remote){
                new schema.Remote({"buttonOneAction": null, "buttonTwoAction":null}).save();
                schema.Remote.findOne({}, function(err,remote){
                    callback(null,remote);
                })
            }else{
                callback(null,remote);    
            }
        }
    });
}
