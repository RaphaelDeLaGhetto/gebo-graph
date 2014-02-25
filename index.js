'use strict';

var schemata = require('./schemata'),
    q = require('q'),
    utils = require('gebo-utils'),
    async = require('async');

module.exports = function(email) {

    // Turn the email into a mongo-friend database name
    var dbName = utils.ensureDbName(email);

    /**
     * Load and expose the schemata
     */
    var _schemata = require('./schemata');
    exports.schemata = _schemata;

    /**
     * Create a uni-directional connect graph from a string
     *
     * @params string
     *
     * @return Object
     */
    function _fromText(text) {
        var graph = {};
        var splitText = text.trim().replace(/\s+/g, ' ').split(' ');
        var thisWord, nextWord;

        for (var i = 0; i < splitText.length - 1; i++) {

          thisWord = splitText[i];
          nextWord = splitText[i + 1];

          if (nextWord.length) {
            if (graph[thisWord]) {
              if (graph[thisWord].indexOf(nextWord) < 0) {
                graph[thisWord].push(nextWord);
              }
            } 
            else {
              graph[thisWord] = [nextWord];
            }
          }
        }
        graph[splitText[splitText.length - 1]] = [];

        return graph;
      };
    exports.fromText = _fromText;

    /**
     * Create a uni-directional weighted graph from a string
     *
     * @params string
     *
     * @return Object
     */
    function _weightedFromText(text) {
        var graph = {};
        var splitText = text.trim().replace(/\s+/g, ' ').split(' ');
        var thisWord, nextWord;

        for (var i = 0; i < splitText.length - 1; i++) {

          thisWord = splitText[i];
          nextWord = splitText[i + 1];

          if (graph[thisWord]) {
            if (graph[thisWord][nextWord] >= 0) {
              graph[thisWord][nextWord]++;
            }
            else {
              graph[thisWord][nextWord] = 0;
            }
          } 
          else {
            graph[thisWord] = {};
            graph[thisWord][nextWord] = 0;
          }
        }
        graph[splitText[splitText.length - 1]] = {};

        return graph;
      };
    exports.weightedFromText = _weightedFromText;

    /**
     * Take JSON-structured text for entry into
     * the corpus and as an addition to the graph
     *
     * @param Object
     * @param array
     *
     * @return promise
     */
    function _addToMongoGraph(structuredText, fields) {
        var deferred = q.defer();

        // Save the structured text to the corpus
        var corpusDb = new schemata.corpus(dbName);
        var entry = new corpusDb.entryModel({ structuredText: structuredText });
        entry.save(function(err, entry) {
            corpusDb.connection.db.close();
            if (err) {
              deferred.reject(err);
            }
            else {
              var entryId = entry._id;
              var text = entry.text(fields);
            
              var graphObj = _weightedFromText(text);

              var graphDb = new schemata.graph(dbName);

              async.eachSeries(Object.keys(graphObj), function(word, callback) {

                    console.log(' -------------------------------- connections');
                    // Connections
                    var connections = [];
                    async.eachSeries(Object.keys(graphObj[word]), function(nextWord, cb) {
                        graphDb.connectionModel.findOne({ nextWord: nextWord, corpusId: entryId },
                                function(err, connection) {
                                    if (err) {
                                      cb(err);
                                    }
                                    if (connection) {
                                      connection.weight++;
                                   }
                                    else {
                                      connection = new graphDb.connectionModel({
                                              nextWord: nextWord,
                                              corpusId: entryId,
                                            });
                                    }
                                    connection.save(function(err) {
                                          if (err) {
                                            cb(err);
                                          }
                                          else {
                                            console.log('connection', connection);

                                            //connections.push(connection);

                                            console.log(' -------------------------------- nodes');
                                            graphDb.nodeModel.findOne({ word: word }, function(err, node) {
                                                if (err) {
                                                  cb(err);
                                                }
                                                if (node) {
                                                  cb();
                                                }
                                                else {
                                                  var graph = new graphDb.nodeModel({ word: word });
                                                  graph.connections.push(connection);
                                                  graph.save(function(err) {
                                                        if (err) {
                                                          console.log(err);
                                                          cb(err);
                                                        }
                                                        else {
                                                          cb();
                                                        }
                                                    });
                                                }
                                              });
                                          }
                                      });

                                });
                      },

                      function(err) {
                        if (err) {
                          callback(err);
                        }
                        else {
                          callback();
                        }
                      }); 
                  },
                function(err) {
                    if (err) {
                    }
                    else {
                      graphDb.connection.db.close();
                      deferred.resolve(entryId);
                    }
                  });

//              graph[splitText[splitText.length - 1]] = [];

            }
          });
        return deferred.promise;
      };
    exports.addToMongoGraph = _addToMongoGraph;

    /**
     * subtractFromMongoGraph
     *
     * @param string
     */
    function _subtractFromMongoGraph(text) {
        var deferred = q.defer();
        deferred.resolve();
        return deferred.promise;
      };
    exports.subtractFromMongoGraph = _subtractFromMongoGraph;

    /**
     * compareWithMongoGraph
     *
     * @param string
     */
    function _compareWithMongoGraph(text) {
        var deferred = q.defer();
        deferred.resolve();
        return deferred.promise;
      };
    exports.compareWithMongoGraph = _compareWithMongoGraph;


    return exports;
  };
