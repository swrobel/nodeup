var request = require('request');
var fs = require('fs');

function returnData(data) {
    data;
}

function getAttendees(eventID) {
  request("http://api.meetup.com/2/rsvps?event_id="+eventID+"&order=event&desc=false&offset=0&format=json&page=500&fields=other_services&sig_id=11045492&sig=dea028d422722b3c71e8c72e65afc31e5587e9c2", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      JSON.parse(body);
    }
  });
}

function getAttendeesStatic() {
  fs.readFile("node_meetup.txt", 'utf-8', function(err, data) {
      if (err) {
          returnData(err);
      }
      else {
          returnData(JSON.parse(data));
      }
  });
}

exports.getAttendees = getAttendees;
exports.getAttendeesStatic = getAttendeesStatic;