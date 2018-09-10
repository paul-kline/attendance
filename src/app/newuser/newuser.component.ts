import { Component, OnInit } from "@angular/core";
// import {OrganizerForm} from "../organizerform/organizerform.component";

@Component({
  selector: "app-newuser",
  templateUrl: "./newuser.component.html",
  styleUrls: ["./newuser.component.css"]
})
export class NewuserComponent implements OnInit {
  selectedRole: String;
  test: Date = new Date();
  options;
  constructor() {
    this.options = [
      {
        value: "Attendee",
        viewValue: "Attendee",
        link: "/attendee"
      },
      {
        value: "Organizer",
        viewValue: "Organizer",
        link: "/organizer"
      }
    ];
  }

  ngOnInit() {}
}
