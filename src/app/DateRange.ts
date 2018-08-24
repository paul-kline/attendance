import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class DateRange {
  from: NgbDate;
  to: NgbDate;

  public getToDate(str): Date {
    return this.addTime(this.td(this.to), str);
  }

  public getFromDate(str): Date {
    return this.addTime(this.td(this.from), str);
  }

  private td(d: NgbDate) {
    return new Date(d.year, d.month - 1, d.day);
  }
  private addTime(d: Date, time: String): Date {
    if (time) {
      let [hours, minutes] = time.split(":");
      d.setHours(Number.parseInt(hours));
      d.setMinutes(Number.parseInt(minutes));
    }
    return d;
  }
}
