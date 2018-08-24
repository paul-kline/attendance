import { Component, OnInit } from "@angular/core";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { OrganizationformdataService } from "../organizationformdata.service";
import { Organizer } from "../Organizer";
@Component({
  selector: "app-organizerform",
  templateUrl: "./organizerform.component.html",
  styleUrls: ["./organizerform.component.css"]
})
export class OrganizerformComponent implements OnInit {
  meters: Number = 300;
  className: String = "";
  organization: Organizer;
  constructor(public orgService: OrganizationformdataService) {}

  generatemeetings() {
    console.log("generating meetings");
    this.organization.generateMeetings();
  }

  ngOnInit() {
    this.organization = this.orgService.organization;
    // window.erg = this.organization;
  }
}
