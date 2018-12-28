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
  public isStudent: boolean | null;
  public curMeeting: Meeting | null;
  constructor() {}
  canCheckIn(coords: { lat; lng; accuracy }) {
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
  nextMeeting(): Meeting | null {
    // let nt = firebase.firestore.Timestamp.fromDate(new Date());
    let nt = new Date();
    return this.meetings.find(x => x.to > nt);
  }
  isMeetingNow() {
    // const nt = firebase.firestore.Timestamp.fromDate(new Date());
    const nt = new Date();
    const cl = this.nextMeeting();
    const b = cl.from <= nt && nt <= cl.to;
    // if (b) {
    //   this.rightNowClasses.push({ className: aclass.name, meeting: cl });
    // }
    return b ? cl : false;
  }
  isAccurate(coords: { accuracy }) {
    return this.curMeeting && this.curMeeting.distance >= coords.accuracy;
  }
  getcurMeeting() {
    if (this.curMeeting) {
      return this.curMeeting;
    } else {
      this.curMeeting = this.isMeetingNow() ? this.nextMeeting() : null;
      return this.curMeeting;
    }
  }
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
  static fromGeneric(obj: { meetings; creatorName } | any): AClass {
    console.log("in fromGeneric for AClass", obj);
    let c = new AClass();
    c.isStudent = c.init(obj, "isStudent");
    c.creatorName = c.init(obj, "creatorName");
    c.creatorEmail = c.init(obj, "creatorEmail");
    c.creatorID = c.init(obj, "creatorID");
    c.classID = c.init(obj, "classID", "id");
    // c.classID = c.init(obj, "id"); //handle named id instead.
    c.meetings = obj.meetings
      ? obj.meetings.map(m => Meeting.fromGeneric(m))
      : [];
    c.from = c.init(obj, "from");
    c.to = c.init(obj, "to");
    c.name = c.init(obj, "name");

    // c.creatorName = obj.creatorName ? obj.creatorName : null;
    // c.creatorName = obj.creatorName ? obj.creatorName : null;
    // c.creatorName = obj.creatorName ? obj.creatorName : null;
    return c;
  }
  init(obj, ...strs) {
    for (let i = 0; i < strs.length; i++) {
      const str = strs[i];
      const p = obj[str];
      if (p != undefined && p != null) {
        return p;
      }
    }
    return null;
    // return obj[str] ? obj[str] : this[str] ? this[str] : null;
  }
}
