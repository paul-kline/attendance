import { Component, OnInit, Input } from "@angular/core";
import { Meeting } from "../Meeting";

@Component({
  selector: "app-meeting",
  templateUrl: "./meeting.component.html",
  styleUrls: ["./meeting.component.css"]
})
export class MeetingComponent implements OnInit {
  @Input()
  public meeting: Meeting;
  constructor() {}

  public strFrom: string = "";
  public strTo: string = "";
  public strLoc: string = "";

  ngOnInit() {
    this.strFrom = this.dateTimeToString(this.meeting.from);
    this.strTo = this.dateTimeToString(this.meeting.to);
    this.strLoc = this.meeting.location.toString();
    // this.newStartTime();
    // this.newEndTime();
    // this.newLoc();
  }

  dateTimeToString(d: Date): string {
    // return d.toISOString().slice(0, -1);
    let two = (n: Number): String => (n < 10 ? "0" + n : "" + n);
    let str = `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(
      d.getDate()
    )}T${two(d.getHours())}:${two(d.getMinutes())}`;
    console.log("returning", str);
    return str;
    //"2018-01-01T16:00"
  }
  stringToDateTime(s: string): Date {
    let d = new Date(s);
    console.log("using", s, "to build this new date", d);
    return d;
  }
  newStartTime() {
    this.meeting.from = this.stringToDateTime(this.strFrom);
  }
  newEndTime() {
    this.meeting.to = this.stringToDateTime(this.strTo);
  }
  newLoc() {
    let [lat, lng] = this.strLoc.trim().split(",");
    this.meeting.location.lat = Number.parseFloat(lat);
    this.meeting.location.lng = Number.parseFloat(lng);
  }
}
