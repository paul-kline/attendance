import { LatLng } from "@agm/core";

export class Meeting {
  from: Date; //specific date-time
  to: Date; //specific date-time
  // lat: number;
  // lng: number;
  location: LatLng;
  distance: number;
}
