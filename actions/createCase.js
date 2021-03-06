var pg = require('pg');
var config = require('../config.js');

options = {
    user: config.pg.username,
    password: config.pg.password,
    database: config.pg.database,
    port: config.pg.port,
    host: config.pg.host,
    ssl: true
}

var createCase = function() {
    var query = 'INSERT INTO salesforce.case(status, origin, description, subject) VALUES($1, $2, $3, $4)';
    var subject = 'Service Required';
    var description = 'Service is required';

    pg.connect(options, function(err, pgClient, done) {

        pgClient.query(query, ['New', 'Web', description, subject], function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {
                console.log(err);
                return err;
            }
        });
    });
}

module.exports = {
    name: 'Create A Case',
    description: 'Create a case in Salesforce',
    execute: createCase
}
