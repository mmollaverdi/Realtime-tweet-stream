var credentials = require('./twitterCredentials');
var ntwitter = require('ntwitter');
var twitter = new ntwitter(credentials);

twitter.verifyCredentials(function (error, data) {
  if (error) {
    console.log('Credential verification error: ' + error);
  }
});

exports.currentTweets = function(emit) {
  emit('Test Content');
};

exports.newTweets = function(emit) {

  twitter.stream(
    'statuses/filter',
    { track: ['nodejs', 'javascript', 'AngularJS', 'EmberJS', 'WebSocket'] },
    function(stream) {

      stream.on('data', function(tweet) {
        console.log('New tweet: ' + tweet.text);
        emit(tweet.text);
      });
      
      stream.on('error', function(error, code) {
        console.log("Steram error: " + error + ": " + code);
      });
    }
  );
};