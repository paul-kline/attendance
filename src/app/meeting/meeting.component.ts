import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Meeting } from "../Meeting";
import { Coords } from "../Coords";

@Component({
  selector: "app-meeting",
  templateUrl: "./meeting.component.html",
  styleUrls: ["./meeting.component.css"]
})
export class MeetingComponent implements OnInit {
  @Input()
  public meeting: Meeting;
  @Output()
  deleted = new EventEmitter<Meeting>();
  constructor() {}

  public strFrom: string = "";
  public strTo: string = "";
  public strLoc: string = "";

  ngOnInit() {
    this.strFrom = this.dateTimeToString(this.meeting.from || new Date());
    this.strTo = this.dateTimeToString(this.meeting.to || new Date());
    try {
      this.strLoc = this.meeting.location.toString();
    } catch (error) {
      console.log("location didn't exist");
      this.meeting.location = new Coords(0, 0);
    }
    // this.newStartTime();
    // this.newEndTime();
    // this.newLoc();
  }

  onDelete() {
    this.deleted.emit(this.meeting);
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
