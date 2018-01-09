(function () {

var async = require('async');
var request = require('request');

// Makes GET request to Search API, returns an object containing the query and
// the JSON metadata
var pullRelatedArticles = function (query, callback) {
  var url = 'https://cis1972016f-hw2-api.herokuapp.com/articlesearch?q=' + query;
  request(url, function (error, response, body) {
    if (!error && !null && response.statusCode === 200) {
      callback({query: query, JSON: body});
    } else if(response.statusCode != 200) {
      callback(error);
    } else {
      callback(error);
    }
  });
};

module.exports = pullRelatedArticles;

})();
