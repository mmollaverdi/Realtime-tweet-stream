var credentials = require('./twitterCredentials').credentials;
var ntwitter = require('ntwitter');
var twitter = new ntwitter(credentials);

exports.currentTweets = function(emit) {
  emit('Test Content');
};

exports.newTweets = function(emit) {

  twitter.stream(
    'statuses/filter',
    { track: ['awesome', 'cool', 'rad', 'gnarly', 'groovy'] },
    function(stream) {
      stream.on('data', function(tweet) {
        console.log(tweet.text);
        emit(tweet.text);
      });
    }
  );
};