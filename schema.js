var mongoose = require('mongoose');

var actionSchema = new mongoose.Schema({
    name: String,
    description: String,
    module: String
});

var remoteSchema = new mongoose.Schema({
    buttonOneAction: mongoose.Schema.Types.ObjectId,
    buttonTwoAction: mongoose.Schema.Types.ObjectId
});

var Remote = mongoose.model('Remote', remoteSchema);
var Action = mongoose.model('Action', actionSchema);

module.exports = {
    Remote: Remote,
    Action: Action
};