var  socketIo = require('socket.io');

exports.start = function(httpServer, currentContent, onNewContent) {

  var socketIoServer = socketIo.listen(httpServer);
  
   socketIoServer.sockets.on('connection', function (socket) {
    currentContent(function(data) {
      socket.volatile.emit('initialContent', data);  
    });
    
  });
  
  onNewContent(function(data) {
     socketIoServer.sockets.volatile.emit('newContent', data);
  });
};
