var http = require("http");
var fs = require('fs');
var meetup = require('./meetup');
var loadedFiles = {};
function returnData(res, code, data) {
    res.writeHead(code, {'Content-Type': 'text/plain'});
    res.end(data);
}

function start() {
  function onRequest(req, res) {
    console.log("Request received.");
    if (loadedFiles[req.url])
        return returnData(res, 200, "Cached: " + loadedFiles[req.url]);

    fs.readFile(__dirname + req.url, 'utf-8', function(err, data) {
        if (err) {
            returnData(res, 404, 'File ' + req.url + ' not found\n');
        }
        else {
            loadedFiles[req.url] = data;
            returnData(res, 200, data);
        }
    });
    res.end();
  }

  http.createServer(onRequest).listen(process.env.PORT);
  console.log("Server has started.");
  
}

exports.start = start;
