import { Component, OnInit } from "@angular/core";
// import {OrganizerForm} from "../organizerform/organizerform.component";

@Component({
  selector: "app-newuser",
  templateUrl: "./newuser.component.html",
  styleUrls: ["./newuser.component.css"]
})
export class NewuserComponent implements OnInit {
  model = "";
  test: Date = new Date();
  constructor() {}

  ngOnInit() {}
}
