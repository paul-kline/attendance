import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { auth, User } from "firebase";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
export interface Item {
  name: string;
}
@Injectable({
  providedIn: "root"
})
export class CredentialsService {
  user: User;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    afAuth.user.subscribe(usr => {
      console.log("User state boop!", usr);
      this.user = usr;
      if (usr) {
        this.handleUserLoggedIn();
      }
    });
  }
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  async handleUserLoggedIn() {
    // window.auth = this.afAuth.auth;
    console.log("user logged in, getting user firestore data");
    let userData = await this.getUserData();
  }
  async getUserData() {
    let me = this;
    let u = this.afs
      .collection("users")
      .doc(this.afAuth.auth.currentUser.uid)
      .ref.get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          me.router.navigateByUrl("/newuser");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    console.log("user data", u);
    return u;
  }
}
