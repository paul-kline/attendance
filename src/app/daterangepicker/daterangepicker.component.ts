import { Component, OnInit, Input } from "@angular/core";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { DateRange } from "../DateRange";

@Component({
  selector: "app-daterangepicker",
  templateUrl: "./daterangepicker.component.html",
  styleUrls: ["./daterangepicker.component.css"]
})
export class DaterangepickerComponent implements OnInit {
  @Input()
  public daterange: DateRange;
  hoveredDate: NgbDate;
  constructor(public calendar: NgbCalendar) {}

  onDateSelection(date: NgbDate) {
    if (!this.daterange.from && !this.daterange.to) {
      this.daterange.from = date;
    } else if (
      this.daterange.from &&
      !this.daterange.to &&
      date.after(this.daterange.from)
    ) {
      this.daterange.to = date;
    } else {
      this.daterange.to = null;
      this.daterange.from = date;
    }
  }

  isHovered = (date: NgbDate) =>
    this.daterange.from &&
    !this.daterange.to &&
    this.hoveredDate &&
    date.after(this.daterange.from) &&
    date.before(this.hoveredDate);
  isInside = (date: NgbDate) =>
    date.after(this.daterange.from) && date.before(this.daterange.to);
  isRange = (date: NgbDate) =>
    date.equals(this.daterange.from) ||
    date.equals(this.daterange.to) ||
    this.isInside(date) ||
    this.isHovered(date);

  ngOnInit() {
    console.log("darerangepicker on init");
    this.daterange.from = this.calendar.getToday();
    this.daterange.to = this.calendar.getNext(
      this.calendar.getToday(),
      "d",
      10
    );
  }
}
