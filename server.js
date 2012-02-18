var http = require('http');
var fs = require('fs');
var path = require('path');


http.createServer(function (req, res) {
    fs.readFile(__dirname + req.url, 'utf-8', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File ' + req.url + ' not found\n');
        }
        else {
            var extname = path.extname(req.url);
            
            if(extname == ".css"){
                mime = "text/css";    
            } else if(extname == ".html" || extname == ".html"){
                mime = "text/html";
            } else if(extname == ".js"){
                mime = "text/javascript";    
            } else if(extname == ".jpg" || extname == ".jpeg"){
                mime = "image/jpeg";    
            } else if(extname == ".gif"){
                mime = "image/gif";    
            } else if(extname == ".png"){
                mime = "image/png";
            } else {
                mime = "text/plain";    
            }


            res.writeHead(200, {'Content-Type': mime});
            res.end(data);
        }
    });
}).listen(process.env.PORT || 80, "0.0.0.0");