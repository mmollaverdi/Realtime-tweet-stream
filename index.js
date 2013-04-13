var httpServer = require('./httpServer').start();

var twitterFeed = require('./twitterFeed');

require('./webSocketServer').start(httpServer, twitterFeed.currentTweets, twitterFeed.newTweets);
