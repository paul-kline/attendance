import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";
import { HttpClientModule } from "@angular/common/http";

import { AgmCoreModule } from "@agm/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SafePipe } from "./safe.pipe";
import { NavbarComponent } from "./navbar/navbar.component";
import { NewuserComponent } from "./newuser/newuser.component";
import { AppRoutingModule } from ".//app-routing.module";
import { FormsModule } from "@angular/forms";
import { OrganizerformComponent } from "./organizerform/organizerform.component";
import { AttendeeformComponent } from "./attendeeform/attendeeform.component";
import { ToUSDatePipe } from "./to-usdate.pipe";
import { DaterangepickerComponent } from "./daterangepicker/daterangepicker.component";
import { DatetimepickerComponent } from "./datetimepicker/datetimepicker.component";
import { MeetingComponent } from "./meeting/meeting.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";

import {
  MatInputModule,
  MatNativeDateModule,
  MatIconModule,
  MatChipsModule,
  MatDividerModule
} from "@angular/material";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MaterialWeeklyChooserComponent } from "./material-weekly-chooser/material-weekly-chooser.component";
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    NavbarComponent,
    NewuserComponent,
    OrganizerformComponent,
    AttendeeformComponent,
    ToUSDatePipe,
    DaterangepickerComponent,
    DatetimepickerComponent,
    MeetingComponent,
    MaterialWeeklyChooserComponent,
    HomeComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDhGElWIiAfR9dSXX5Zds7_hbFOodx35CI"
    }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
