import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewuserComponent } from "./newuser/newuser.component";
import { OrganizerformComponent } from "./organizerform/organizerform.component";
import { AttendeeformComponent } from "./attendeeform/attendeeform.component";
import { HomeComponent } from "./home/home.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
  {
    path: "newuser",
    component: NewuserComponent
  },
  { path: "organizer", component: OrganizerformComponent },
  { path: "attendee", component: AttendeeformComponent },
  { path: "home", component: HomeComponent },
  { path: "signup/:id", component: SignUpComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
