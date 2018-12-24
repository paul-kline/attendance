import { Meeting } from "./Meeting";
import * as firebase from "firebase";

export class AClass {
  public meetings: Meeting[];
  public creatorName: string;
  public creatorEmail: string;
  public creatorID: string;
  public classID: string;
  public name: string;
  public from: Date;
  public to: Date;
  public curMeeting: Meeting | null;
  constructor() {}
  canCheckIn(coords: { lat; lng }) {
    return (
      this.curMeeting &&
      (this.isAccurate(coords) || true) &&
      AClass.calcCrowDistM(
        coords.lat,
        coords.lng,
        this.curMeeting.location.lat,
        this.curMeeting.location.lng
      ) <= this.curMeeting.distance
    );
  }
  nextMeeting(aclass) {
    let nt = firebase.firestore.Timestamp.fromDate(new Date());
    return aclass["meetings"].find(x => x.to > nt);
  }
  isMeetingNow(aclass) {
    const nt = firebase.firestore.Timestamp.fromDate(new Date());
    const cl = this.nextMeeting(aclass);
    const b = cl.from <= nt && nt <= cl.to;
    // if (b) {
    //   this.rightNowClasses.push({ className: aclass.name, meeting: cl });
    // }
    return b ? cl : false;
  }
  isAccurate(coords) {
    return this.curMeeting && this.curMeeting.distance >= coords.accuracy;
  }
  getcurMeeting() {}
  toGeneric() {
    let res = Object.assign({}, this);
    res.meetings = res.meetings.map(m => m.toGeneric());
    return res;
  }
  static deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  static calcCrowDistM(lat1, lon1, lat2, lon2) {
    var R = 6371000; // Radius of the earth in m
    var dLat = AClass.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = AClass.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(AClass.deg2rad(lat1)) *
        Math.cos(AClass.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }
  static fromGeneric(obj: { meetings; creatorName }): AClass {
    console.log("in fromGeneric for AClass", obj);
    let c = new AClass();
    c.creatorName = c.init(obj, "creatorName");
    c.creatorEmail = c.init(obj, "creatorEmail");
    c.creatorID = c.init(obj, "creatorID");
    c.classID = c.init(obj, "classID");
    c.meetings = obj.meetings ? obj.meetings.map(m => new Meeting(m)) : [];
    c.from = c.init(obj, "from");
    c.to = c.init(obj, "to");
    c.name = c.init(obj, "name");

    c.creatorName = obj.creatorName ? obj.creatorName : null;
    c.creatorName = obj.creatorName ? obj.creatorName : null;
    c.creatorName = obj.creatorName ? obj.creatorName : null;
    return c;
  }
  init(obj, str) {
    return obj[str] ? obj[str] : null;
  }
}
