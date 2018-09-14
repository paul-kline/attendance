import { Injectable } from "@angular/core";
import { OrganizerFormData } from "./OrganizerFormData";
@Injectable({
  providedIn: "root"
})
export class OrganizationformdataService {
  public organizerFormData: OrganizerFormData;
  constructor() {
    this.organizerFormData = new OrganizerFormData();

    window.formData = this.organizerFormData;
    console.log("set form data as window prop");
  }
}
