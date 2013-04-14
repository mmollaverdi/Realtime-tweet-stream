var httpServer = require('http').createServer(handler)
  ,fs = require('fs')
  ,url = require('url');
  
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function handler (request, response) {
  var pathname = url.parse(request.url).pathname;
  //console.log('pathname: ' + pathname);
  if ('/' === pathname) {
    pathname = '/index.html';
  }
  if (pathname.endsWith('.html') || pathname.endsWith('.js') || pathname.endsWith('.css')) {
    fs.readFile(__dirname + pathname, function (error, data) {
      if (error) {
        response.writeHead(404);
        return response.end('Resource not found');
      }
      response.writeHead(200);
      response.end(data);
    });
  } else {
    response.writeHead(404);
    response.end('Resource not found');
  }
};

exports.start = function() {
  httpServer.listen(80);
  return httpServer;
};