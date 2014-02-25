var graph = require('..')('dan@example.com'),
    schemata = require('../schemata'),
    utils = require('gebo-utils');

var GEN_9_6 = '"Whoever sheds human blood,\n' +
              'by humans shall their blood be shed;\n' +
              'for in the image of God\n' +
              'has God made mankind.';

var EXODUS_20_13_16 = '“You shall not murder.\n\n' +
                      '“You shall not commit adultery.\n\n' +
                      '“You shall not steal.\n\n' +
                      '“You shall not give false testimony against your neighbor.\n\n';

var MATT_6_9_13 = 'Pray then like this:\n' +
                  '"Our Father in heaven,\n' +
                  'hallowed be your name.\n' +
                  'Your kingdom come,\n' +
                  'your will be done,\n' +
                  'on earth as it is in heaven.\n' +
                  'Give us this day our daily bread,\n' +
                  'and forgive us our debts,\n' +
                  'as we also have forgiven our debtors.\n' +
                  'And lead us not into temptation,\n' +
                  'but deliver us from evil.';

var PROVERBS_16_33 = 'The    lot     is \t  cast into the lap,\n' +
                     '   but\tits    every  \tdecision is from the       Lord.\n\n\n';

var DOC = {
            source: 'The Bible',
            book: 'Numbers',
            chapter: 14,
            start: 41,
            end: 43,
            text: 'But Moses said, “Why are you disobeying the ' +
                  'Lord’s command? This will not succeed! Do not ' +
                  'go up, because the Lord is not with you. You ' +
                  'will be defeated by your enemies, for the ' +
                  'Amalekites and the Canaanites will face you ' +
                  'there. Because you have turned away from the ' +
                  'Lord, he will not be with you and you will fall ' +
                  'by the sword.”',
        };


/**
 * fromText
 */
exports.fromText = {

    'Return a non-weighted uni-directional connected graph object made from text': function(test) {
        test.expect(47);
        var g = graph.fromText(MATT_6_9_13);
        test.deepEqual(g['Pray'], ['then']);
        test.deepEqual(g['then'], ['like']);
        test.deepEqual(g['like'], ['this:']);
        test.deepEqual(g['this:'], ['"Our']);
        test.deepEqual(g['"Our'], ['Father']);
        test.deepEqual(g['Father'], ['in']);
        test.deepEqual(g['in'], ['heaven,', 'heaven.']);
        test.deepEqual(g['heaven,'], ['hallowed']);
        test.deepEqual(g['hallowed'], ['be']);
        test.deepEqual(g['be'], ['your', 'done,']);
        test.deepEqual(g['your'], ['name.', 'will']);
        test.deepEqual(g['name.'], ['Your']);
        test.deepEqual(g['Your'], ['kingdom']);
        test.deepEqual(g['kingdom'], ['come,']);
        test.deepEqual(g['come,'], ['your']);
        //test.deepEqual(g['your'], ['will']);
        test.deepEqual(g['will'], ['be']);
        //test.deepEqual(g['be'], ['done,']);
        test.deepEqual(g['done,'], ['on']);
        test.deepEqual(g['on'], ['earth']);
        test.deepEqual(g['earth'], ['as']);
        test.deepEqual(g['as'], ['it', 'we']);
        test.deepEqual(g['it'], ['is']);
        test.deepEqual(g['is'], ['in']);
        //test.deepEqual(g['in'], ['heaven.']);
        test.deepEqual(g['heaven.'], ['Give']);
        test.deepEqual(g['Give'], ['us']);
        test.deepEqual(g['us'], ['this', 'our', 'not', 'from']);
        test.deepEqual(g['this'], ['day']);
        test.deepEqual(g['day'], ['our']);
        test.deepEqual(g['our'], ['daily', 'debts,', 'debtors.']);
        test.deepEqual(g['daily'], ['bread,']);
        test.deepEqual(g['bread,'], ['and']);
        test.deepEqual(g['and'], ['forgive']);
        test.deepEqual(g['forgive'], ['us']);
        //test.deepEqual(g['us'], ['our']);
        //test.deepEqual(g['our'], ['debts,']);
        test.deepEqual(g['debts,'], ['as']);
        //test.deepEqual(g['as'], ['we']);
        test.deepEqual(g['we'], ['also']);
        test.deepEqual(g['also'], ['have']);
        test.deepEqual(g['have'], ['forgiven']);
        test.deepEqual(g['forgiven'], ['our']);
        //test.deepEqual(g['our'], ['debtors.']);
        test.deepEqual(g['debtors.'], ['And']);
        test.deepEqual(g['And'], ['lead']);
        test.deepEqual(g['lead'], ['us']);
        //test.deepEqual(g['us'], ['not']);
        test.deepEqual(g['not'], ['into']);
        test.deepEqual(g['into'], ['temptation,']);
        test.deepEqual(g['temptation,'], ['but']);
        test.deepEqual(g['but'], ['deliver']);
        test.deepEqual(g['deliver'], ['us']);
        //test.deepEqual(g['us'], ['from']);
        test.deepEqual(g['from'], ['evil.']);
        test.deepEqual(g['evil.'], []);
        test.done();
    },

    'Return a repetitive non-weighted uni-directional connected graph object made from text': function(test) {
        test.expect(13);
        var g = graph.fromText(EXODUS_20_13_16);
        test.deepEqual(g['“You'], ['shall']);
        test.deepEqual(g['shall'], ['not']);
        test.deepEqual(g['not'], ['murder.', 'commit', 'steal.', 'give']);
        test.deepEqual(g['murder.'], ['“You']);
        //test.deepEqual(g['“You'], ['shall']);
        //test.deepEqual(g['shall'], ['not']);
        //test.deepEqual(g['not'], ['commit']);
        test.deepEqual(g['commit'], ['adultery.']);
        test.deepEqual(g['adultery.'], ['“You']);
        //test.deepEqual(g['“You'], ['shall']);
        //test.deepEqual(g['shall'], ['not']);
        //test.deepEqual(g['not'], ['steal.']);
        test.deepEqual(g['steal.'], ['“You']);
        //test.deepEqual(g['“You'], ['shall']);
        //test.deepEqual(g['shall'], ['not']);
        //test.deepEqual(g['not,'], ['give']);
        test.deepEqual(g['give'], ['false']);
        test.deepEqual(g['false'], ['testimony']);
        test.deepEqual(g['testimony'], ['against']);
        test.deepEqual(g['against'], ['your']);
        test.deepEqual(g['your'], ['neighbor.']);
        test.deepEqual(g['neighbor.'], []);
        test.done();
    },
};

/**
 * weightedFromText
 */
exports.weightedFromText = {

    'Return a weighted uni-directional connected graph object made from text': function(test) {
        test.expect(13);
        var g = graph.weightedFromText(EXODUS_20_13_16);
        test.deepEqual(g['“You'], { 'shall': 3 });
        test.deepEqual(g['shall'], { 'not': 3 });
        test.deepEqual(g['not'], { 'murder.': 0, 'commit': 0, 'steal.': 0, 'give': 0 });
        test.deepEqual(g['murder.'], { '“You': 0 });
        //test.deepEqual(g['“You'], { 'shall': 0 });
        //test.deepEqual(g['shall'], { 'not': 0 });
        //test.deepEqual(g['not'], { 'commit': 0 });
        test.deepEqual(g['commit'], { 'adultery.': 0 });
        test.deepEqual(g['adultery.'], { '“You': 0 });
        //test.deepEqual(g['“You'], { 'shall': 0 });
        //test.deepEqual(g['shall'], { 'not': 0 });
        //test.deepEqual(g['not'], { 'steal.': 0 });
        test.deepEqual(g['steal.'], { '“You': 0 });
        //test.deepEqual(g['“You'], { 'shall': 0 });
        //test.deepEqual(g['shall'], { 'not': 0 });
        //test.deepEqual(g['not,'], { 'give': 0 });
        test.deepEqual(g['give'], { 'false': 0 });
        test.deepEqual(g['false'], { 'testimony': 0 });
        test.deepEqual(g['testimony'], { 'against': 0 });
        test.deepEqual(g['against'], { 'your': 0 });
        test.deepEqual(g['your'], { 'neighbor.': 0 });
        test.deepEqual(g['neighbor.'], {});
        test.done();
    },
};

/**
 * The graph schema needs to be added to the gebo's
 * collection of schemata. This test ensures that this
 * schema is exposed.
 */
exports.schemata = {
    
    'Expose the graph schema': function(test) {
        test.expect(1);
        var db = new graph.schemata.graph('dan@example.com');
        test.equal(typeof db, 'object');
        db.connection.db.close();
        test.done();
    },
};

/**
 * addToMongoGraph
 */
exports.addToMongoGraph = {

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

    'Add a record to the corpus collection': function(test) {
        test.expect(1);
        graph.addToMongoGraph(DOC, ['text']).
            then(function() {
                var corpusDb = new schemata.corpus('dan@example.com');
                corpusDb.entryModel.find({ 'structuredText.source': 'The Bible' },
                    function(err, entries) {
                        if (err) {
                          console.log(err);
                          test.ok(false);
                        }
                        test.equal(entries.length, 1);
                        test.done();
                      });
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false);
                test.done();
              });
    },

    'Add each word in the fields specified to the graph collection': function(test) {
        test.expect(2);
        graph.addToMongoGraph(DOC, ['text']).
            then(function() {
                var graphDb = new schemata.graph('dan@example.com');
                graphDb.nodeModel.find(function(err, nodes) {
                        graphDb.connection.db.close();
                        if (err) {
                          console.log(err);
                          test.ok(false);
                        }
                        console.log('nodes');
                        console.log(nodes);
                        console.log(nodes.length);
                        test.equal(nodes.length, 43);
//                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'and')].weight, 1);
                        test.done();
                      });
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false);
                test.done();
              });
    },

    'Weight each word in the mongo graph collection': function(test) {
        test.expect(11);
        graph.addToMongoGraph(DOC, ['text']).
            then(function() {
                var graphDb = new schemata.graph('dan@example.com');
                graphDb.nodeModel.find(function(err, nodes) {
                        graphDb.connection.db.close();
                        if (err) {
                          console.log(err);
                          test.ok(false);
                        }
                        // Amalekites and
                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'Amalekites')].connections[0].weight, 1);
                        // will not
                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'will')].connections[0].weight, 1);
                        // will be
                        console.log('----------', nodes[utils.getIndexOfObject(nodes, 'word', 'will')]); 
                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'will')].connections[1].weight, 1);
//                        // will face
//                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'will')].connections[2].weight, 0);
//                        // will fall
//                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'will')].connections[3].weight, 0);
 
                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'by')].connections[0].weight, 1);
                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'not')].connections[0].weight, 3);
                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'the')].connections[0].weight, 5);
                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'will')].connections[0].weight, 4);
                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'with')].connections[0].weight, 1);
                        test.equal(nodes[utils.getIndexOfObject(nodes, 'word', 'you')].connections[0].weight, 4);
                        test.done();
                      });
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false);
                test.done();
              });
    },
};

/**
 * subtractFromMongoGraph
 */
exports.subtractFromMongoGraph = {

    'Remove a record from the corpus collection': function(test) {
        test.done();
    },

    'Remove each word from the mongo graph collection': function(test) {
        test.done();
    },
};

/**
 * compareWithMongoGraph
 */
exports.compareWithMongoGraph = {

    'Remove a record from the corpus collection': function(test) {
        test.done();
    },

    'Remove each word from the mongo graph collection': function(test) {
        test.done();
    },
};

