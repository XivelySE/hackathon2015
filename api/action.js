var Action = require('../schema.js').Action;

exports.getAllActions = function(callback){
    Action.find({}, function(err, actions){
        if(err)
            callback(err);
        else {
            callback(null,actions);
        }
    })
}