'use strict';

module.exports = function() {

    /**
     * Create a uni-directional connect graph from a string
     *
     * @params string
     *
     * @return Object
     */
    function _fromText(text) {
        var graph = {};
        var splitText = text.split(/\s/);

        for (var i = 0; i < splitText.length - 1; i++) {
          if (graph[splitText[i]]) {
            if (graph[splitText[i]].indexOf() < 0) {
              graph[splitText[i]].push(splitText[i + 1]);
            }
          } 
          else {
            graph[splitText[i]] = [splitText[i + 1]];
          }
        }
        graph[splitText[splitText.length - 1]] = [];

        return graph;
      };
    exports.fromText = _fromText;

    return exports;
  }();
