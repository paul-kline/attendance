// import { LatLng } from "@agm/core";
import { Coords } from "./Coords";

export class Meeting {
  constructor(obj) {
    this.from = obj.from ? obj.from : null;
    this.to = obj.to ? obj.to : null;
    this.location = obj.location ? Coords.mkCoords(obj.location) : null;
    this.distance = obj.distance ? obj.distance : null;
  }
  toGeneric() {
    let res = Object.assign({}, this);
    res.location = res.location.toGeneric();
    return res;
  }
  fromGeneric(obj: {}): Meeting {
    return new Meeting(obj);
  }
  from: Date; //specific date-time
  to: Date; //specific date-time
  // lat: number;
  // lng: number;
  location: Coords;
  distance: number;
}
