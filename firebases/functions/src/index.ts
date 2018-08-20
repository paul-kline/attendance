import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  let dat = request.query;
  console.log("body", request.body);
  console.log("query", request.query);

  response.send(checkin(dat.lat, dat.lng, dat.user));
});

let goalcoords = {
  lat: 38.957732,
  lng: -95.25383
};

function checkin(lat, lng, user) {
  console.log("here is what I got", lat, lng, user);
  //for now, just send back the distance from the spot.
  let dist = calcCrow(lat, lng, goalcoords.lat, goalcoords.lng);
  console.log("distance is", dist);
  return {
    distance: dist,
    accepted: false
  };
}

//in km
function calcCrow(lat1, lon1, lat2, lon2) {
  let R = 6371; // km
  let dLat = toRad(lat2 - lat1);
  let dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}
