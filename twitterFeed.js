var credentials = require('./twitterCredentials');
var ntwitter = require('ntwitter');
var twitter = new ntwitter(credentials);

twitter.verifyCredentials(function (error, data) {
  if (error) {
    console.log('Credential verification error: ' + error);
  }
});

exports.currentTweets = function(emit) {
  twitter.search(
    'nodejs OR javascript OR AngularJS OR EmberJS OR WebSocket',
    {rpp: 5, result_type: 'recent'},
	function(error, searchResult) {
	  if (error) {
	    console.log("REST API error: " + error);
	  }
	  var tweets = [];
	  for (var i = 0; i < searchResult.results.length; i++) {
	    var tweet = searchResult.results[i];
	    tweets[i] = {text: tweet.text, author: tweet.from_user};
	  }
	  emit(tweets);
	}
  );
};

exports.onNewTweet = function(emit) {

  twitter.stream(
    'statuses/filter',
    { track: ['nodejs', 'javascript', 'AngularJS', 'EmberJS', 'WebSocket'] },
    function(stream) {

      stream.on('data', function(tweet) {
        console.log('New tweet, text: ' + tweet.text + ', author: ' + tweet.user.screen_name);
        emit({text: tweet.text, author: tweet.user.screen_name});
      });
      
      stream.on('error', function(error, code) {
        console.log("Steram error: " + error + ": " + code);
      });
    }
  );
};