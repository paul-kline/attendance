import { Injectable } from "@angular/core";
import { Organizer } from "./Organizer";
@Injectable({
  providedIn: "root"
})
export class OrganizationformdataService {
  public organization: Organizer;
  constructor() {
    this.organization = new Organizer();
  }
}
