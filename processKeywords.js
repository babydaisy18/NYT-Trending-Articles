(function () {

var pullRelatedArticles = require('./pullRelatedArticles');
var async = require('async');

// Gets related article metadata for each of the keywords in the array,
// passing an array of objects to the callback
var processKeywords = function (topKeywords, callback) {
  async.map(topKeywords, pullRelatedArticles, callback);
};

module.exports = processKeywords;

})();
