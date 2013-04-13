var httpServer = require('http').createServer(handler)
  ,fs = require('fs');

function handler (request, response) {
  fs.readFile(__dirname + '/index.html',
    function (error, data) {
      if (error) {
        response.writeHead(500);
        return response.end('Internal Server Error');
      }
      response.writeHead(200);
      response.end(data);
    });
};

exports.start = function() {
  httpServer.listen(80);
  return httpServer;
};