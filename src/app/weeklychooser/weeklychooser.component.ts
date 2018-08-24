import { Component, OnInit } from "@angular/core";
import { OrganizationformdataService } from "../organizationformdata.service";
import { Organizer } from "../Organizer";

@Component({
  selector: "app-weeklychooser",
  templateUrl: "./weeklychooser.component.html",
  styleUrls: ["./weeklychooser.component.css"]
})
export class WeeklychooserComponent implements OnInit {
  public organization: Organizer;

  constructor(public orgService: OrganizationformdataService) {}

  ngOnInit() {
    this.organization = this.orgService.organization;
    console.log("weeklychooser org:", this.organization);
  }
}
