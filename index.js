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
            if (graph[thisWord][nextWord]) {
              graph[thisWord][nextWord]++;
              //graph[thisWord][nextWord] = graph[thisWord][nextWord]+1;
            }
          } 
          else {
            //graph[thisWord] = { nextWord: 0 };
            graph[thisWord] = {};
            graph[thisWord][nextWord] = 0;
          }
        }
        graph[splitText[splitText.length - 1]] = {};

        return graph;
      };
    exports.weightedFromText = _weightedFromText;


    return exports;
  }();
