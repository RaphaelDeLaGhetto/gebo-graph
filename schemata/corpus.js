'use strict';

var utils = require('gebo-utils');

module.exports = function(email) {

    // Turn the email into a mongo-friendly database name
    var dbName = utils.ensureDbName(email);

    var mongoose = require('mongoose');

    /**
     *  Database config
     */
    var uristring =
        process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/' + dbName;

    var mongoOptions = { db: { safe: true } };

    /**
     * Connect to mongo
     */
    var connection = mongoose.createConnection(uristring, mongoOptions);

    connection.on('open', function() {
        console.log ('Successfully connected to: ' + uristring);
      });

    connection.on('error', function(err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      });

    /**
     * This is handy for when I need to drop a database
     * during testing
     */
    exports.connection = connection;

    /**
     * Database schema
     */
    var Schema = mongoose.Schema,
    //ObjectId = Schema.Types.ObjectId;
    Mixed = Schema.Types.Mixed;

    /**
     * Corpus schema
     */
    var corpusSchema = new Schema({
        structuredText: { type: Mixed, required: true },
      });

    // Export corpusSchema
    try {
        var corpusModel = connection.model('Corpus', corpusSchema);
        exports.corpusModel = corpusModel;
      }
    catch (error) {}

   
    /**
     * API
     */
    return exports;
  };
