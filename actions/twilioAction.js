var config = require('../config.js');

var client = require('twilio')(config.sms.sid, config.sms.authToken);
var sendSMSMessage = function(){
    client.sendMessage({

    to:config.sms.destPhone, 
    from: config.sms.phone,
    body: 'A message was sent from asset 98879'

}, function(err, responseData) { 
    if (err)
        console.log(err);
});
}

module.exports = {
    name: 'Send SMS',
    description: 'Send an SMS message over the Twilio service',
    execute: sendSMSMessage
}