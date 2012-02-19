var http = require("http");
var fs = require('fs');
var request = require('request');
var path = require('path');
var loadedFiles = {};
function returnData(res, code, data) {
    res.writeHead(code, {'Content-Type': 'text/html'});
    var body = '<!DOCTYPE html>\
    <html>\
    <head>\
      <title>FollowUp!</title>\
      <link href="/css/bootstrap/css/bootstrap.min.css" media="screen" rel="stylesheet" type="text/css" />\
      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>\
      <script src="http://platform.linkedin.com/in.js" type="text/javascript"></script>\
    </head>\
    <body>\
    <div class="container-fluid"><div class="content">\
    <div class="row">';
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
      console.log(i);
      console.log(data[i]);
      console.log(typeof data[i].member_photo);
      if (typeof data[i].member_photo !== 'undefined' && typeof data[i].member.other_services !== 'undefined' && typeof data[i].member.other_services.twitter !== 'undefined' && typeof data[i].member.other_services.linkedin !== 'undefined')
        body += '<div class="span5"><img src="'+data[i].member_photo.photo_link+'" width="200"/><p><a href="https://twitter.com/'+data[i].member.other_services.twitter.identifier.substr(1)+'" class="twitter-follow-button" data-show-count="false">'+data[i].member.name+'</a><script type="IN/MemberProfile" data-id="'+data[i].member.other_services.linkedin.identifier+'" data-format="hover" data-text="'+data[i].member.name+'"></script></p></div>';
    }
    body += '</div></div></div></body></html>';
    res.end(body);
}

function getMeetup(eventID) {
  request("http://api.meetup.com/2/rsvps?event_id="+eventID+"&order=event&desc=false&offset=0&format=json&page=500&fields=other_services&sig_id=11045492&sig=dea028d422722b3c71e8c72e65afc31e5587e9c2", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      JSON.parse(body);
    }
  });
}

function getMeetupStatic(fn) {
  fs.readFile("node_meetup.txt", 'utf-8', function(err, data) {
      if (err) {
          fn(err);
      }
      else {
          var json = JSON.parse(data);
          fn(null, json);
      }
  });
}

http.createServer(function (req, res) {
  if (loadedFiles[req.url])
      return returnData(res, 200, "Cached: " + loadedFiles[req.url]);

  fs.readFile(__dirname + req.url, 'utf-8', function(err, data) {
        if (err && req.url != "/favicon.ico") {
            getMeetupStatic(function(err, data){ returnData(res, 200, data.results); });
        }
        else {
            var mime = "";
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
