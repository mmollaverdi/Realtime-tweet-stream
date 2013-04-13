var httpServer = require('./httpServer').start();

require('./webSocketServer').start(httpServer);
