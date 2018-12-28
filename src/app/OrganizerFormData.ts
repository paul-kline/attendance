import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Meeting } from "./Meeting";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { DateRange } from "./DateRange";
import { LatLng } from "@agm/core";
import { FormControl } from "@angular/forms";
import { OnInit } from "@angular/core";
import { Coords } from "./Coords";

export class OrganizerFormData implements OnInit {
  ngOnInit(): void {
    // this.toDate.setDate(this.fromDate.getDate() + 10);
    //moved to constructor?
  }
  fromDate: Date = new Date();
  toDate: Date = new Date();
  // dateRange: DateRange;
  fromTime: String = "03:04";
  toTime: String = "15:55";
  locationString: String = "";
  withinMeters: number = 35;
  who: Object = {
    selection: "",
    password: "",
    accountemailstxt: "",
    fieldname: "",
    uniqueidstxt: ""
  };

  week = [
    { letter: "M", selected: false },
    { letter: "T", selected: false },
    { letter: "W", selected: false },
    { letter: "R", selected: false },
    { letter: "F", selected: false },
    { letter: "S", selected: false },
    { letter: "U", selected: false }
  ];

  whocanchoices = [
    { value: "anyone", viewValue: "Anyone" },
    { value: "password", viewValue: "Password Protected on sign-up" },
    { value: "accounts", viewValue: "Only Accounts under these Emails" },
    { value: "uniqueField", viewValue: "Must Claim one of These Unique IDs " }
  ];
  name: String;
  public location: Coords;
  meetings: Array<Meeting>;
  constructor() {
    this.toDate.setDate(this.fromDate.getDate() + 10);
  }
  W = ["U", "M", "T", "W", "R", "F", "S"];
  setTimes() {
    this.fromDate = this.withTime(this.fromDate, this.fromTime);
    this.toDate = this.withTime(this.toDate, this.toTime);
  }
  withTime(d: Date, time: String): Date {
    let _d = new Date(d);
    let [h, m] = time.split(":");
    _d.setHours(Number.parseInt(h));
    _d.setMinutes(Number.parseInt(m));
    return _d;
  }
  generateMeetings(wipeAll = true): void {
    if (!this.meetings) {
      this.meetings = [];
    }
    if (wipeAll) {
      this.meetings = [];
    }
    // this.setTimes();
    // console.log("date range", this.dateRange);
    let begin_start = this.withTime(this.fromDate, this.fromTime); //dateRange.getFromDate(this.fromTime);
    let begin_end = this.withTime(this.fromDate, this.toTime); //dateRange.getFromDate(this.toTime);
    let end_start = this.withTime(this.toDate, this.fromTime); //dateRange.getToDate(this.fromTime);
    let end_end = this.withTime(this.toDate, this.toTime); //dateRange.getToDate(this.toTime);
    console.log("ending start is", end_start);
    let cur_start = new Date(begin_start);
    let cur_end = new Date(begin_end);
    let W = this.W;
    while (cur_start <= end_start) {
      // console.log("checking day", cur_start);
      // if (this.week[W[cur_start.getDay()]].selected) {
      if (this.week[(cur_start.getDay() + 6) % 7].selected) {
        // console.log("this day!!");
        let m = new Meeting();
        m.from = cur_start;
        console.log("jsut set from to ", cur_start);
        m.to = cur_end;
        m.location = this.location;
        // console.log("location is:", this.location);
        m.distance = this.withinMeters;
        // console.log("i have set. here is the meeting", m);
        this.meetings.push(m);
      }
      cur_start = new Date(cur_start);
      cur_end = new Date(cur_end);
      cur_start.setDate(cur_start.getDate() + 1);
      cur_end.setDate(cur_end.getDate() + 1);
      // console.log("curstart now", cur_start);
    }
    // console.log("meetingss", this.meetings);
    // window.meetins = this.meetings;
    // console.log(
    //   "cur start vs end start",
    //   cur_start,
    //   end_start,
    //   cur_start < end_start
    // );
  }
  mkDate(d: NgbDate, time: String = "") {
    let x = new Date(d.year, d.month - 1, d.day);
    if (time) {
    }
    return x;
  }

  getEarliestLatest() {
    const ms = this.meetings;
    let earliest, latest: Date;
    earliest = ms[0].from;
    latest = ms[0].to;
    for (const m of ms) {
      if (m.to > latest) {
        latest = m.to;
      }
      if (m.from < earliest) {
        earliest = m.from;
      }
    }
    return [earliest, latest];
    // console.log("earliest class:", earliest);
    // console.log("latest class:", latest);
  }
}
