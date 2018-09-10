import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Meeting } from "./Meeting";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { DateRange } from "./DateRange";
import { LatLng } from "@agm/core";

export class Organizer {
  dateRange: DateRange;
  fromTime: String = "";
  toTime: String = "";
  days = {
    M: false,
    T: false,
    W: false,
    R: false,
    F: false,
    S: false,
    U: false
  };
  name: String;
  location: LatLng;
  distance: Number;
  meetings: Array<Meeting>;
  constructor() {
    console.log("organizer created"); //needs to be here?
    this.dateRange = new DateRange();
  }
  W = ["U", "M", "T", "W", "R", "F", "S"];
  generateMeetings(wipeAll = true): void {
    if (!this.meetings) {
      this.meetings = [];
    }
    console.log("date range", this.dateRange);
    if (wipeAll) {
      let begin_start = this.dateRange.getFromDate(this.fromTime);
      let begin_end = this.dateRange.getFromDate(this.toTime);
      let end_start = this.dateRange.getToDate(this.fromTime);
      let end_end = this.dateRange.getToDate(this.toTime);
      console.log("ending start is", end_start);
      let cur_start = new Date(begin_start);
      let cur_end = new Date(begin_end);
      let W = this.W;
      while (cur_start <= end_start) {
        console.log("checking day", cur_start);
        if (this.days[W[cur_start.getDay()]]) {
          console.log("this day!!");
          let m = new Meeting();
          m.from = cur_start;
          m.to = cur_end;
          m.location = this.location;
          this.meetings.push(m);
        }
        cur_start = new Date(cur_start);
        cur_end = new Date(cur_end);
        cur_start.setDate(cur_start.getDate() + 1);
        cur_end.setDate(cur_end.getDate() + 1);
        console.log("curstart now", cur_start);
      }
      console.log("meetingss", this.meetings);

      console.log(
        "cur start vs end start",
        cur_start,
        end_start,
        cur_start < end_start
      );
    } else {
      //extend dates || strink dates.
    }
  }
  mkDate(d: NgbDate, time: String = "") {
    let x = new Date(d.year, d.month - 1, d.day);
    if (time) {
    }
    return x;
  }
}
