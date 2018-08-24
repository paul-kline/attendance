import { Pipe, PipeTransform } from "@angular/core";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

@Pipe({
  name: "toUSDate"
})
export class ToUSDatePipe implements PipeTransform {
  transform(date: NgbDate): any {
    if (date) {
      return `${date.month}/${date.day}/${date.year}`;
    } else {
      return ""; //"-/-/----";
    }
  }
}
