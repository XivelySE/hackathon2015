var mongoose = require('mongoose');

var actionSchema = new mongoose.Schema({
    name: String,
    description: String,
    module: String
});

var buttonConfigSchema = new mongoose.Schema({
    deviceId: String,
    buttonId: {type:Number, min:1, max:2},
    action: mongoose.Schema.Types.ObjectId
});

var ButtonConfig = mongoose.model('ButtonConfig', buttonConfigSchema);
var Action = mongoose.model('Action', actionSchema);

module.exports = {
    ButtonConfig: ButtonConfig,
    Action: Action
};