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
    ObjectId = Schema.Types.ObjectId;

    /**
     * Connection schema
     */
    var connectionSchema = new Schema({
        corpusId: { type: ObjectId, required: true, unique: true },
        weight: { type: Number, required: true, unique: true, default: 0 },
      });

    // Export connectionSchema
    try {
        var connectionModel = connection.model('Connection', connectionSchema);
        exports.connectionModel = connectionModel;
      }
    catch (error) {}

   
    /**
     * Node schema
     */
    var nodeSchema = new Schema({
        word: { type: String, required: true, unique: true },
        connections: [connectionSchema], 
      });

    // Export nodeSchema
    try {
        var nodeModel = connection.model('Node', nodeSchema);
        exports.nodeModel = nodeModel;
      }
    catch (error) {}

    /**
     * API
     */
    return exports;
  };
