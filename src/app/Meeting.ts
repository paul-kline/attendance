// import { LatLng } from "@agm/core";
import { Coords } from "./Coords";

export class Meeting {
  from: Date; //specific date-time
  to: Date; //specific date-time
  // lat: number;
  // lng: number;
  location: Coords;
  distance: number;
}
