var http = require("http");
var Spire = require('spire.io.js');

function start() {
  function onRequest(request, response) {
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(process.env.PORT);
  console.log("Server has started.");
}

exports.start = start;