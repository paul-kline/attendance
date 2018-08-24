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
import { WeeklychooserComponent } from './weeklychooser/weeklychooser.component';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
import { DatetimepickerComponent } from './datetimepicker/datetimepicker.component';
import { MeetingComponent } from './meeting/meeting.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    NavbarComponent,
    NewuserComponent,
    OrganizerformComponent,
    AttendeeformComponent,
    ToUSDatePipe,
    WeeklychooserComponent,
    DaterangepickerComponent,
    DatetimepickerComponent,
    MeetingComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
