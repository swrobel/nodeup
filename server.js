var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile(__dirname + req.url, 'utf-8', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File ' + req.url + ' not found\n');
        }
        else {
            if(req.url.substr(-4, 4) == ".css"){
                mime = "text/css";    
            } else if(req.url.substr(-4,4) == ".htm" || req.url.substr(-5,5) == ".html"  ){
                mime = "text/html";
            } else if(req.url.substr(-3,3) == ".js"){
                mime = "text/javascript";    
            } else {
                mime = "text/plain";    
            }

            res.writeHead(200, {'Content-Type': mime});
            res.end(data);
        }
    });
}).listen(process.env.PORT || 80, "0.0.0.0");