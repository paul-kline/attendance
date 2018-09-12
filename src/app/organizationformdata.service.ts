import { Injectable } from "@angular/core";
import { OrganizerFormData } from "./OrganizerFormData";
@Injectable({
  providedIn: "root"
})
export class OrganizationformdataService {
  public organizerFormData: OrganizerFormData;
  constructor() {
    this.organizerFormData = new OrganizerFormData();
  }
}
