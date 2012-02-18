var request = require('request');

function getAttendees(eventID) {
  request("http://api.meetup.com/2/rsvps?event_id="+eventID+"&order=event&desc=false&offset=0&format=json&page=500&fields=other_services&sig_id=11045492&sig=dea028d422722b3c71e8c72e65afc31e5587e9c2", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      JSON.parse(body)[1][0];
    }
  });
}