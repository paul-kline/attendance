import { Component, OnInit } from "@angular/core";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { OrganizationformdataService } from "../organizationformdata.service";
import { OrganizerFormData } from "../OrganizerFormData";
import { MatStepperModule } from "@angular/material/stepper";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
@Component({
  selector: "app-organizerform",
  templateUrl: "./organizerform.component.html",
  styleUrls: ["./organizerform.component.css"]
})
export class OrganizerformComponent implements OnInit {
  meters: Number = 300;
  className: String = "";
  organizerFormData: OrganizerFormData;
  formGroup: FormGroup;

  nameFormGroup: FormGroup; //name the class
  whenFormGroup: FormGroup; //When info like date interval, time, days of week.
  whereFormGroup: FormGroup;
  confirmFormGroup: FormGroup;
  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }
  constructor(
    public orgService: OrganizationformdataService,
    private _formBuilder: FormBuilder
  ) {}

  chipclicked(day) {
    day.selected = !day.selected;
    console.log(this.organizerFormData.week);
  }
  generatemeetings() {
    console.log("generating meetings");
    this.organizerFormData.generateMeetings();
  }

  ngOnInit() {
    this.organizerFormData = this.orgService.organizerFormData;
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          nameFormCtrl: ["", null] //Validators.required]
          // ,lastNameFormCtrl: ["", Validators.required]
        }),
        this._formBuilder.group({
          startDateFormCtrl: ["", null], //Validators.required],
          endDateFormCtrl: ["", null], //Validators.required],
          startTimeFormCtrl: ["", null], //Validators.required],
          endTimeFormCtrl: ["", null] //Validators.required]
        }),
        this._formBuilder.group({})
      ])
    });

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
