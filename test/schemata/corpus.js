'use strict';

var schemata = require('../../schemata');

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
 * corpusModel.text static method
 */
exports.text = {

    'Return no fields if no fields specified': function(test) {
        test.expect(1);

        var db = new schemata.corpus('dan@example.com');
        var entry = new db.entryModel({ structuredText: DOC }); 

        var text = entry.text();

        test.equal(text, '');
        db.connection.db.close();
        test.done();
    },

    'Return only the fields specified': function(test) {
        test.expect(1);

        var db = new schemata.corpus('dan@example.com');
        var entry = new db.entryModel({ structuredText: DOC }); 

        var text = entry.text(['book', 'chapter', 'start', 'end']);

        test.equal(text, 'Numbers 14 41 43');
        db.connection.db.close();
        test.done();
    },

    'Return the fields specified in the order given': function(test) {
        test.expect(1);

        var db = new schemata.corpus('dan@example.com');
        var entry = new db.entryModel({ structuredText: DOC }); 

        var text = entry.text(['start', 'chapter', 'book', 'end']);

        test.equal(text, '41 14 Numbers 43');
        db.connection.db.close();
        test.done();
    },

    'Don\'t barf when given fields that don\'t exist': function(test) {
        test.expect(2);

        var db = new schemata.corpus('dan@example.com');
        var entry = new db.entryModel({ structuredText: DOC }); 

        var text = entry.text(['disk', 'track']);
        test.equal(text, '');

        text = entry.text(['disk', 'text', 'track']);
        test.equal(text, DOC.text);

        db.connection.db.close();
        test.done();
    },
};

