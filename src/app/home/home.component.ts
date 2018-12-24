import { Component, OnInit } from "@angular/core";
import { CredentialsService } from "../credentials.service";
import * as firebase from "firebase";
// import { Location } from "@angular/common"; // <--- Here
import { PlatformLocation } from "@angular/common";
import { Router } from "@angular/router";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  periodsSet = false;
  aclasses: any[];
  origin: string;
  coords;
  geo_options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };
  me = this;
  constructor(
    private credentialService: CredentialsService,
    public router: Router
  ) {}

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  startWatchingPosition() {
    const me = this;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        pos => {
          console.log("position updated! your current position is:");
          console.log(pos.coords.latitude + ", " + pos.coords.longitude);
          me.coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy
          };
          console.log(me.attendingClasses());
          me.aclasses.forEach(c => {
            if (c.curMeeting) {
              const dist = me.calcCrowDistM(
                me.coords.lat,
                me.coords.lng,
                c.curMeeting.location.lat,
                c.curMeeting.location.lng
              );
              console.log("can check in", c.canCheckIn(me.coords), "c was", c);
              console.log("is accurate?", c.isAccurate(me.coords));

              console.log(
                "class:" + c.name + " Your distance:" + dist,
                "Accuracy:",
                pos
              );
            }
          });
        },
        err => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        this.geo_options
      );
    } else {
      console.log("No support for geolocation");
    }
  }
  calcCrowDistM(lat1, lon1, lat2, lon2) {
    var R = 6371000; // Radius of the earth in m
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }
  ownsClasses(): boolean {
    const c = this.credentialService;
    return c && c.rawOwnedClasses && c.rawOwnedClasses.length > 0;
  }
  ownClasses() {
    return this.credentialService.rawOwnedClasses;
  }

  attendsClasses(): boolean {
    const c = this.credentialService;
    return c && c.attendingClasses && c.attendingClasses.length > 0;
  }
  attendingClasses() {
    return this.credentialService.attendingClasses;
  }
  async ngOnInit() {
    // const baseUrl = Window.
    this.origin = location.origin;
    this.startWatchingPosition();
    const me = this;
    //set curClass properties.
    this.credentialService.getAttended().then(classes => {
      me.aclasses = classes;
      classes.forEach(c => {
        c.curMeeting = me.isMeetingNow(c);
        c.isAccurate = coords => {
          return c.curMeeting && c.curMeeting.distance >= coords.accuracy;
        };
        c.canCheckIn = coords => {
          return (
            c.curMeeting &&
            (c.isAccurate(coords) || true) &&
            me.calcCrowDistM(
              me.coords.lat,
              me.coords.lng,
              c.curMeeting.location.lat,
              c.curMeeting.location.lng
            ) <= c.curMeeting.distance
          );
        };
      });
      // me.aclasses = classes;
      console.log("classes now have now meeting property set", classes);
    });
  }
  checkIn(aclass) {
    const me = this;
    if (aclass.curMeeting && aclass.canCheckIn(this.coords)) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          me.credentialService.checkIn(aclass, pos.coords);
        },
        null,
        this.geo_options
      );
    }
  }
  nextMeeting(aclass) {
    let nt = firebase.firestore.Timestamp.fromDate(new Date());
    return aclass["meetings"].find(x => x.to > nt);
  }
  isMeetingNow(aclass) {
    const nt = firebase.firestore.Timestamp.fromDate(new Date());
    const cl = this.nextMeeting(aclass);
    const b = cl.from <= nt && nt <= cl.to;
    // if (b) {
    //   this.rightNowClasses.push({ className: aclass.name, meeting: cl });
    // }
    return b ? cl : false;
  }
}
