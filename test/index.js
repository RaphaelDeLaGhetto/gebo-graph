var graph = require('..');

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

/**
 * fromText
 */
exports.fromText = {

    'Return a uni-directional connected graph object made from text': function(test) {
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
};

