import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-datetimepicker",
  templateUrl: "./datetimepicker.component.html",
  styleUrls: ["./datetimepicker.component.css"]
})
export class DatetimepickerComponent implements OnInit {
  private _date: Date;
  public strDate: string; // = "2020-02-03T15:03";

  @Input()
  set datetime(d: Date) {
    console.log("date time set");
    this._date = d;
    // this.strDate = "2020-02-03T16:03"; //d.toISOString();
    this.strDate = this.toDateString(this._date); //""; //d.toISOString();
  }
  get datetime() {
    return this._date;
  }
  private toDateString(date: Date): string {
    return (
      date.getFullYear().toString() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      "T" +
      date.toTimeString().slice(0, 5)
    );
  }
  onInput() {
    let d = new Date(this.strDate);
    //keep the reference to the object the same.
    this._date.setDate(d.getDate());
    this._date.setFullYear(d.getFullYear());
    this._date.setMonth(d.getMonth());
    this._date.setMinutes(d.getMinutes());
    this._date.setHours(d.getHours());
    this._date.setSeconds(d.getSeconds());
    this._date.setMilliseconds(d.getMilliseconds());
  }

  constructor() {}

  ngOnInit() {}
}
