(function () {

var async = require('async');
var pullTrendingArticles = require('./pullTrendingArticles');
var countKeywords = require('./countKeywords');
var processKeywords = require('./processKeywords');

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

var getTrendingKeywords = function (callback) {
  async.waterfall([pullTrendingArticles, 
    countKeywords,  
    processKeywords], function (error, results) {
      callback(error, results);
    });
};

// test code
if (process.env.NODE_ENV !== 'test') {
  getTrendingKeywords(displayRelatedArticles);
}

module.exports = getTrendingKeywords;

})();
