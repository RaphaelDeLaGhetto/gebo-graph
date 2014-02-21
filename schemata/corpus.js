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
    Mixed = Schema.Types.Mixed;

    /**
     * Entry schema
     */
    var entrySchema = new Schema({
        structuredText: { type: Mixed, required: true },
      });

    /**
     * A corpus entry consists of an ObjectId and some
     * JSON structured text. This function takes the values
     * associated with the keys provided and produces a string
     * comprised of those values in the order given
     *
     * @param array
     *
     * @returns string
     */
    entrySchema.methods.text = function(fields) {
        var str = '';

        if (!fields) {
          return str;
        }

        for (var i = 0; i < fields.length; i++) {
          if (this.structuredText[fields[i]]) {
            str += this.structuredText[fields[i]] + ' '; 
          }
        };
        str = str.slice(0, -1);

        return str;
      };

    // Export entrySchema
    try {
        var entryModel = connection.model('Entry', entrySchema);
        exports.entryModel = entryModel;
      }
    catch (error) {}

   
    /**
     * API
     */
    return exports;
  };

