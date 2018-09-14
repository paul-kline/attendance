import { Component, OnInit } from "@angular/core";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { OrganizationformdataService } from "../organizationformdata.service";
import { OrganizerFormData } from "../OrganizerFormData";
import { MatStepperModule } from "@angular/material/stepper";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormArray
} from "@angular/forms";
import { Coords } from "../Coords";
@Component({
  selector: "app-organizerform",
  templateUrl: "./organizerform.component.html",
  styleUrls: ["./organizerform.component.css"]
})
export class OrganizerformComponent implements OnInit {
  meters: Number = 300;
  className: String = "";
  public organizerFormData: OrganizerFormData;
  formGroup: FormGroup;

  nameFormGroup: FormGroup; //name the class
  whenFormGroup: FormGroup; //When info like date interval, time, days of week.
  whereFormGroup: FormGroup;
  confirmFormGroup: FormGroup;
  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }
  get formArrayasFormArray(): FormArray | null {
    return this.formGroup.get("formArray") as FormArray;
  }
  constructor(
    public orgService: OrganizationformdataService,
    private _formBuilder: FormBuilder
  ) {
    this.organizerFormData = orgService.organizerFormData;
  }
  generateMeetings() {
    console.log("important next clicked to view meetings");
    this.setWithFormData();
    this.organizerFormData.generateMeetings();
    console.log(
      "I have generated the meetings, here is my organizerFromData.meetings",
      this.organizerFormData.meetings
    );
  }
  setWithFormData() {
    let o = this.organizerFormData;
    o.name = this.nameFormGroup.controls.nameFormCtrl.value;
    o.fromDate = this.whenFormGroup.controls.startDateFormCtrl.value;
    o.toDate = this.whenFormGroup.controls.endDateFormCtrl.value;
    o.fromTime = this.whenFormGroup.controls.startTimeFormCtrl.value;
    o.toTime = this.whenFormGroup.controls.endTimeFormCtrl.value;

    o.locationString = this.whereFormGroup.controls.coordsFormCtrl.value;
    let [lat, lng] = o.locationString.trim().split(",");
    console.log("here at lat and lng", lat, lng);
    console.log("here is parsed lat", Number.parseFloat(lat));
    o.location = new Coords(Number.parseFloat(lat), Number.parseFloat(lng));

    console.log("here is o.location", o.location);
    o.withinMeters = this.whereFormGroup.controls.metersFormCtrl.value;
  }
  clickelem(id: string) {
    let elem = document.getElementById(id);
    let evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    });
    elem.dispatchEvent(evt);
  }
  chipclicked(day) {
    day.selected = !day.selected;
    console.log(this.organizerFormData.week);
  }
  generatemeetings() {
    console.log("generating meetings");
    this.organizerFormData.generateMeetings();
  }
  initializeValues() {}
  ngOnInit() {
    this.nameFormGroup = this._formBuilder.group({
      nameFormCtrl: ["", null] //Validators.required]
      // ,lastNameFormCtrl: ["", Validators.required]
    });

    this.whenFormGroup = this._formBuilder.group({
      startDateFormCtrl: [this.organizerFormData.fromDate, null], //Validators.required],
      endDateFormCtrl: [this.organizerFormData.toDate, null], //Validators.required],
      daysFormCtrl: [],
      startTimeFormCtrl: [this.organizerFormData.fromTime, null], //Validators.required],
      endTimeFormCtrl: [this.organizerFormData.toTime, null] //Validators.required]
    });
    this.whereFormGroup = this._formBuilder.group({
      coordsFormCtrl: [this.organizerFormData.locationString, null], //Validators.required],
      metersFormCtrl: [this.organizerFormData.withinMeters] //Validators.required],
    });
    //
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this.nameFormGroup,
        this.whenFormGroup,
        this.whereFormGroup,
        this._formBuilder.group({})
      ])
    });
    this.initializeValues();
    window.form = this.formArrayasFormArray;

    // this.nameFormGroup = this._formBuilder.group({
    //   nameFormCtrl: ["bob", Validators.required]
    //   // ,lastNameCtrl: ["", Validators.required]
    // });

    // this.emailFormGroup = this._formBuilder.group({
    //   emailCtrl: ["", Validators.email]
    // });
    // window.erg = this.organization;
  }
}
