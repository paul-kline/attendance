// import { LatLng } from "@agm/core";
import { Coords } from "./Coords";
import * as firebase from "firebase";

export class Meeting {
  from: Date; //specific date-time
  to: Date; //specific date-time
  // lat: number;
  // lng: number;
  location: Coords;
  distance: number;
  constructor() {}
  toGeneric() {
    let res = Object.assign({}, this);
    res.location = res.location.toGeneric();
    return res;
  }
  static fromGeneric(obj): Meeting {
    let r = new Meeting();
    r.from = handleDate(obj.from);
    r.to = handleDate(obj.to);
    r.location = obj.location ? Coords.mkCoords(obj.location) : null;
    r.distance = obj.distance ? obj.distance : null;
    return r;

    function handleDate(dm): Date {
      return dm
        ? Meeting.isTimestamp(dm)
          ? (<firebase.firestore.Timestamp>dm).toDate()
          : dm
        : null;
    }
  }

  static isTimestamp(obj) {
    return (
      obj instanceof firebase.firestore.Timestamp ||
      (obj.seconds && obj.nanoseconds)
    );
  }
}
