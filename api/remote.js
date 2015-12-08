var schema = require('schema');

var associateButtonToAction = function(buttonId,actionId, callback){
    if ((buttonId != 1 && buttonId != 2) || !actionId || actionId == null)
        callback("Bad configuration");
    else {
        schema.Remote.findOne({}, function(err,remote){
            if(err)
                callback(err);
            else if(!err && !remote){
                remote = new Remote({buttonOneAction:null, buttonTwoAction: null});
            }
            else
            {
                if(buttonId == 1)
                    buttonOneAction = actionId;
                else
                    buttonTwoAction = actionId;
            }
            callback(null, true);
        });
    }
}

var executeButtonPressAction = function(actionDictionary, buttonId){
    if (buttonId != 1 && buttonId != 2)
        callback("No such buttonId");
    else{
        schema.Remote.findOne({}, function(err,remote){
            var buttonActionId = null;
            if(err)
                callback(err);
            else if(!remote)
                callback("Remote has not yet been configured");
            else{
                if(buttonId == 1)
                    buttonActionId = remote.buttonOneAction;
                else
                    buttonActionId = remote.buttonTwoAction;
            }
          

            schema.Action.findById(buttonActionId, function(err, action){
                if(err)
                    callback(err);
                else if(!action)
                    callback("Couldn't find an action with that id");
                else {
                    actionDictionary[action.name]();
                }
            })
    }
}