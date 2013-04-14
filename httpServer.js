var httpServer = require('http').createServer(handler)
  ,fs = require('fs')
  ,url = require('url');
  
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function handler (request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log('pathname: ' + pathname);
  if (pathname.endsWith('.js')) {
    fs.readFile(__dirname + pathname, function (error, data) {
      if (error) {
        response.writeHead(500);
        return response.end('Internal Server Error');
      }
      response.writeHead(200);
      response.end(data);
    });
  } else {
    fs.readFile(__dirname + '/index.html', function (error, data) {
      if (error) {
        response.writeHead(500);
        return response.end('Internal Server Error');
      }
      response.writeHead(200);
      response.end(data);
    
    });
  }
};

exports.start = function() {
  httpServer.listen(80);
  return httpServer;
};