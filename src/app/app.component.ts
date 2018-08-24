import { Component } from "@angular/core";
import { ChatboxService } from "./chatbox.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "A Ten Dance";
  slogan = "The easiest way to take attendance.";
  checkintext = "Check in!";
  message = "";
  src = "";
  lat: number = 51.678418;
  lng: number = 7.809007;
  success = false;
  constructor(public chatbox: ChatboxService) {}

  attendance() {
    this.checkintext = "checking...";
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.positionfound.bind(this),
        this.positionfailed.bind(this),
        { enableHighAccuracy: true }
      );
    } else {
      this.message = "geodata is not available on this device.";
      /* geolocation IS NOT available */
    }
  }
  positionfound(position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    console.log(position.coords.latitude, position.coords.longitude);
    this.chatbox.getServerResponse(this.lat, this.lng, {}).subscribe(x => {
      console.log("from subscription");
      console.log(x);
    });

    this.checkintext = "success!";
    this.message = "You are checked in";
    // console.log(auth);
    this.success = true;
    // window.auth = this.afAuth;
  }
  positionfailed(err) {
    console.log("error", err);
    this.message = "Cannot get location information.\n" + err.message;
  }
}
