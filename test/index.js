var graph = require('..');

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

    'Add a record to the corpus collection': function(test) {
        test.done();
    },

    'Add each word to the mongo graph collection': function(test) {
        test.done();
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

