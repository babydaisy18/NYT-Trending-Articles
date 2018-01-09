(function () {

var request = require('request');

// Makes GET request to Most Popular API, returns an XML string containing
// article metadata
var pullTrendingArticles = function (callback) {
  request('https://cis1972016f-hw2-api.herokuapp.com/mostpopular', function (error, response, body) {
    if (!error && !null && response.statusCode == 200) {
      callback(null, body);
    } else if (response.statusCode != 200) {
      callback(error);
    } else {
      callback(error);
    }
  });
};

module.exports = pullTrendingArticles;

})();
