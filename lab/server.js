// Based on info from https://www.w3schools.com/nodejs/default.asp
// this file must be initialized as node server.js
// 
// Currently it must be initialized from the lab folder
// or else have the full location of index.html.
//
// The server is turned off by cntrl-c or cmd -c.
//
// NOTE: Netbeans seams to have a version of this server built-in and 
// may even have Apache's server since Apache is taking over development of the IDE
// from Oracle 

var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);

  if (req.url != '/') {
    var filename = "." + q.pathname;      
  }
  else{
    var filename = 'index.html';
  }

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });

}).listen(8080);