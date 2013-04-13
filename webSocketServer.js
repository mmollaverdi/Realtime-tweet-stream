exports.start = function(httpServer, onConnect, onNewContent) {

  var webSocketServer = require('socket.io').listen(httpServer);
  
  webSocketServer.sockets.on('connection', function (socket) {
    onConnect(function(data) {
      socket.volatile.emit('initialContent', data);  
    });
    
  });
  
  onNewContent(function(data) {
    webSocketServer.sockets.emit('newContent', data);
  });
};
