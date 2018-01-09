(function () {

var async = require('async');
var pullTrendingArticles = require('./pullTrendingArticles');
var countKeywords = require('./countKeywords');
var processKeywords = require('./processKeywords');

// HELPER, don't modify this function
// Prints related article headlines and links from the array of objects
var displayRelatedArticles = function (error, relatedArticles) {
  if (!error) {
    for (var i = 0; i < relatedArticles.length; i++) {
      console.log('=====================================');
      console.log('The #' + (i + 1) + ' trending topic is: ' + relatedArticles[i].query);
      console.log('Here are ten recent related articles.');
      console.log('===================================== \n');
      var results = JSON.parse(relatedArticles[i].JSON).response.docs;
      for (var j = 0; j < results.length; j++) {
        console.log((j + 1) + '. ' + results[j].headline.main);
        console.log(results[j].web_url + '\n');
      }
    }
  } else {
    console.log(error);
  }
  console.log('test');
};

// Final method: try to use async.waterfall. Errors are handled in the callback.
var getTrendingKeywords = function (callback) {
  // Your code goes here
  async.waterfall([pullTrendingArticles, 
    countKeywords,  
    processKeywords], function (error, results) {
      callback(error, results);
    });
};

// This block allows you to test your code by running
// 'node getTrendingKeywords.js' in your project folder.
// We don't want to run it in a test environment, however,
// so we check the NODE_ENV variable before running it.
if (process.env.NODE_ENV !== 'test') {
  getTrendingKeywords(displayRelatedArticles);
}

module.exports = getTrendingKeywords;

})();
