exports.start = function(httpServer) {
  var webSocketServer = require('socket.io').listen(httpServer);
  webSocketServer.sockets.on('connection', function (socket) {
    socket.volatile.emit('content', 'Test Content');
  });
};
