
var graph = require('../..')('dan@example.com'),
    schemata = require('../../schemata'),
    utils = require('gebo-utils');

var DOC = {
            source: 'The Bible',
            book: 'Exodus',
            chapter: 20,
            start: 13,
            end: 16,
            text: '“You shall not murder.\n\n' +
                  '“You shall not commit adultery.\n\n' +
                  '“You shall not steal.\n\n' +
                  '“You shall not give false testimony against your neighbor.\n\n',
        };

/**
 * connectionModel.weight virtual property
 */
exports.weight = {

    setUp: function(callback) {
        graph.addToMongoGraph(DOC, ['text']).
            then(function() {
                callback();
              }).
            catch(function(err) {
                console.log(err);
                callback();
              });
    },

    tearDown: function(callback) {
        var corpusDb = new schemata.corpus('dan@example.com');
        corpusDb.connection.on('open', function(err) {
            corpusDb.connection.db.dropDatabase(function(err) {
                if (err) {
                  console.log(err);
                }
                corpusDb.connection.db.close();

                var graphDb = new schemata.graph('dan@example.com');
                graphDb.connection.on('open', function(err) {
                    graphDb.connection.db.dropDatabase(function(err) {
                        if (err) {
                          console.log(err);
                        }
                        graphDb.connection.db.close();
                        
                        callback();
                      });
                  });
              });
          });
    },

    'Return the number of ObjectIds in the corpusIds property': function(test) {
        test.expect(45);
        var graphDb = new schemata.graph('dan@example.com');
        graphDb.nodeModel.find(function(err, nodes) {
            graphDb.connection.db.close();
            if (err) {
                console.log(err);
                test.ok(false);
              }
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', '“You')].connections[0].nextWord, 'shall');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', '“You')].connections[0].weight, 4);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', '“You')].connections[0].corpusIds.length, 4);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'shall')].connections[0].nextWord, 'not');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'shall')].connections[0].weight, 4);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'not')].connections[0].nextWord, 'murder.');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'not')].connections[0].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'murder.')].connections[0].nextWord, '“You');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'murder.')].connections[0].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', '“You')].connections[0].nextWord, 'shall');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', '“You')].connections[0].weight, 4);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'shall')].connections[0].nextWord, 'not');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'shall')].connections[0].weight, 4);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'not')].connections[1].nextWord, 'commit');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'not')].connections[1].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'commit')].connections[0].nextWord, 'adultery.');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'commit')].connections[0].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'adultery.')].connections[0].nextWord, '“You');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'adultery.')].connections[0].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', '“You')].connections[0].nextWord, 'shall');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', '“You')].connections[0].weight, 4);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'shall')].connections[0].nextWord, 'not');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'shall')].connections[0].weight, 4);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'not')].connections[2].nextWord, 'steal.');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'not')].connections[2].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'steal.')].connections[0].nextWord, '“You');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'steal.')].connections[0].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', '“You')].connections[0].nextWord, 'shall');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', '“You')].connections[0].weight, 4);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'shall')].connections[0].nextWord, 'not');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'shall')].connections[0].weight, 4);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'not')].connections[3].nextWord, 'give');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'not')].connections[3].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'give')].connections[0].nextWord, 'false');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'give')].connections[0].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'false')].connections[0].nextWord, 'testimony');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'false')].connections[0].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'testimony')].connections[0].nextWord, 'against');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'testimony')].connections[0].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'against')].connections[0].nextWord, 'your');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'against')].connections[0].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'your')].connections[0].nextWord, 'neighbor.');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'your')].connections[0].weight, 1);
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'neighbor.')].connections[0].nextWord, '__STOP__');
              test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'neighbor.')].connections[0].weight, 1);
              test.done();
          });
    },

};

