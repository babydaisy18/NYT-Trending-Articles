(function () {

var sax = require('sax');
var tempArray;
var status = false;

// Counts keyword frequency of articles in the XML using sax, returns a string
// array of the five most popular keywords
var countKeywords = function (POPULAR_XML, callback) {
  // Create a SAX XML parser. The "false" argument indicates it won't accept invalid XML.
  var parser = sax.parser(false);

  parser.onerror = function (e) {
    //stop parsing and pass error to callback
    callback(e);
  };

  parser.ontext = function (t) {
    //parse some text for a node
    if (status == true) {
      tempArray = t.split(';');
      for (var i = 0; i < tempArray.length; i++) {
        tempArray[i] = tempArray[i].trim();
      }
    }
  };

 parser.onopentag = function (node) {
    //parsed an opening tag for a node
    if (node === '<ADX_KEYWORDS>') {
      status = true;
    }
  };

  parser.onclosetag = function (node) {
    if (node === '</ADX_KEYWORDS>') {
      status = false;
    }
  };

  parser.onend = function () {

    var obj = {};

    //fill up the object with key-value pairings of words
    for (var i = 0; i < tempArray.length; i++) {
      if (obj.hasOwnProperty(tempArray[i])) {
        obj[tempArray[i]]++;
      } else {
        obj[tempArray[i]] = 1;
      }
    }

    var objKeys = Object.keys(obj);
    objKeys.sort(function (a, b) {
      return obj[b] - obj[a];
    });
    callback(objKeys);

  };

  // Kick off the parser with the input XML.
  parser.write(POPULAR_XML).close();
};

module.exports = countKeywords;

})();

