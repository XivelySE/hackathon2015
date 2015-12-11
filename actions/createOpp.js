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

var createOpportunity = function() {
    var query = 'INSERT INTO salesforce.opportunity(name, stageName, closeDate, description) VALUES($1, $2, $3, $4)';
    
    pg.connect(options, function(err, pgClient, done) {

        pgClient.query(query, ['Reorder request', 'Prospecting', new Date(), 'An order request has been entered'], function(err, result) {
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
    name: 'Create An Opportunity',
    description: 'Create an open opportunity in Salesforce',
    execute: createOpportunity
}