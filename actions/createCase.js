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

var createCase = function(success, error) {
    var query = 'INSERT INTO salesforce.case(status, origin, description) VALUES($1, $2, $3)';
    var description = 'Service Required';
    console.log(options);

    pg.connect(options, function(err, pgClient, done) {

        pgClient.query(query, ['New', 'Web', description], function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {
                return err;
            }
        });
    });
}

module.exports = {
    name: 'Create case',
    description: 'Create a case in Salesforce',
    execute: createCase
}
