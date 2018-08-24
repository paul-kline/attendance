import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewuserComponent } from "./newuser/newuser.component";
import { OrganizerformComponent } from "./organizerform/organizerform.component";
import { AttendeeformComponent } from "./attendeeform/attendeeform.component";

const routes: Routes = [
  {
    path: "newuser",
    component: NewuserComponent,
    children: [
      { path: "organizer", component: OrganizerformComponent },
      { path: "attendee", component: AttendeeformComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
