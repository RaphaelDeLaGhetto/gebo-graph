var fs = require('fs'),
    path = require('path');

exports.onLoad = {
    tearDown: function(callback) {
        var files = fs.readdirSync(__dirname + '/../../schemata');

        files.forEach(function(file) {
            if (require.cache[path.resolve(__dirname + '/../../schemata/' + file)]) {
              delete require.cache[path.resolve(__dirname + '/../../schemata/' + file)]
            }
          });
        callback();
    },

    'Load every file in the schemata folder': function(test) {
        test.expect(2);
        var schemata = require('../../schemata');
        test.equal(typeof schemata.graph, 'function');
        test.equal(typeof schemata.corpus, 'function');
        test.done();
    },
};
