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
import { OrganizerFormData } from "./OrganizerFormData";
import * as firebase from "firebase";
import { AClass } from "./AClass";
import { Meeting } from "./Meeting";

export interface Item {
  name: string;
}
@Injectable({
  providedIn: "root"
})
export class CredentialsService {
  user: User;
  ownedClasses: AClass[];
  attendingClasses: AClass[];
  loggedinPromise: Promise<any>;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.loggedinPromise = new Promise((resolve, reject) => {
      afAuth.user.subscribe(usr => {
        console.log("User state boop!", usr);
        this.user = usr;
        if (usr) {
          resolve(usr);
          this.handleUserLoggedIn();
        } else {
        }
      });
    });
  }
  checkIn(aclass: AClass, coords: Coordinates) {
    //to Which meeting?
    const meet: Meeting = aclass.getcurMeeting();
    const student: { name; id; email } = {
      name: this.user.displayName,
      id: this.user.uid,
      email: this.user.email
    };
    //need to submit the class to two places.
    //1: add it to my own list that i've attended.
    const meetingDoc = this.afs
      .collection("users")
      .doc(this.user.uid)
      .collection("attendingClasses")
      .doc(aclass.classID)
      .collection("meetings")
      .doc(meet.from.toLocaleString());

    // var cityRef = db.collection('cities').doc('BJ');

    // var setWithMerge = cityRef.set({
    //     capital: true
    // }, { merge: true });
    //I want to create if not exists (set) and merge makes it not overwrite everything else.
    //collections implicity created.
    meetingDoc.set(
      {
        attendees: firebase.firestore.FieldValue.arrayUnion(student)
      },
      { merge: true }
    );
    //2: add it to the "master" class object itself.

    console.log("check in attempt", aclass);
  }
  getOwnedClasses() {}
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  async getAttended() {
    let res;
    if (this.attendingClasses && this.attendingClasses.length > 0) {
      res = this.attendingClasses;
    } else {
      res = await this.getFullAttendedClasses();
    }
    return res;
  }
  async handleUserLoggedIn() {
    // window.auth = this.afAuth.auth;
    console.log("user logged in, getting user firestore data");
    let userData = await this.getUserData();
    if (!this.ownedClasses) {
      this.ownedClasses = await this.getOwnedClassesForUser();
    }
    if (!this.attendingClasses) {
      this.attendingClasses = await this.getFullAttendedClasses();
    }
    console.log("userData", userData);
    console.log("ownedClasses", this.ownedClasses);
  }
  async getUserData() {
    let me = this;
    // let u = { user: null, classesOwned: [], classesAttending: null };
    return await this.afs
      .collection("users")
      .doc(this.afAuth.auth.currentUser.uid)
      .ref.get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          console.log("this user has no account yet. creating!");
          return me.createNewUser();
          // me.router.navigateByUrl("/newuser");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    // console.log("user data", u);
    // return u;
  }
  async getOwnedClassesForUser(): Promise<AClass[]> {
    const uid = this.afAuth.auth.currentUser.uid;
    let classes = [];
    return this.afs
      .collection("classes")
      .ref.where("creatorID", "==", uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log("claasses!!!!", doc.id, " => ", doc.data());
          let aclass = { id: doc.id, ...doc.data() };
          // aclass.docID = doc.id;
          classes.push(AClass.fromGeneric(aclass));
        });
        return classes;
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        return [];
      });
  }

  async getClass(id: string): Promise<AClass> {
    return this.afs
      .collection("classes")
      .doc(id)
      .ref.get()
      .then(qsnap => AClass.fromGeneric({ classID: id, ...qsnap.data() }))
      .catch(e => null); //.ref.get(id).then(qsnap =>{
  }
  async getMyAttendedClasses(): Promise<AClass[]> {
    await this.loggedinPromise;
    // console.log("the user is:", JSON.stringify(this.user));
    // const uid = this.afAuth.auth.currentUser.uid;
    const uid = this.user.uid;
    console.log("uid in getmyattendedclasses", uid);
    return this.afs
      .collection("users")
      .doc(uid)
      .collection("attendingClasses")
      .ref.get()
      .then(function(querySnapshot) {
        let classes: AClass[] = [];
        querySnapshot.forEach(function(doc) {
          classes.push(
            AClass.fromGeneric({
              classID: doc.id,
              name: doc.data().name,
              isStudent: true
            })
          );
          // doc.data() is never undefined for query doc snapshots
          console.log(
            "results in getMyAttendedClasses",
            doc.id,
            " => ",
            doc.data()
          );
        });
        return classes;
      });
  }
  async getFullAttendedClasses(): Promise<AClass[]> {
    const mylist = await this.getMyAttendedClasses();
    console.log("getting full attendded classes, here is mylist:", mylist);
    const p = mylist.map(c =>
      this.afs
        .collection("classes")
        .doc(c.classID)
        .ref.get()
        .then(q => {
          // console.log("getfullattended classes was:", q, q.data());
          return AClass.fromGeneric({ id: q.id, ...q.data() });
        })
    );
    console.log("p is:", p);
    const classes = await Promise.all(p);

    console.log("cla!", classes);

    return classes;
  }
  async createNewUser() {
    // https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
    const userCollection = this.afs.collection("users");
    const user = this.afAuth.auth.currentUser;
    const email = user.email;
    const displayname = user.displayName;
    const photourl = user.photoURL;

    userCollection
      .doc(user.uid)
      .set(
        { email: email, name: displayname, photourl: photourl },
        { merge: true }
      );
  }
  async addToMyClasses(classObj: AClass) {
    //add user detail to class.
    //add class details to user profile

    //add to my own list.
    const user = this.afAuth.auth.currentUser;
    const x = this.afs
      .collection("users")
      .doc(user.uid)
      .collection("attendingClasses")
      .doc(classObj.classID)
      .set({
        classID: classObj.classID,
        name: classObj.name
      });

    //add this person as attending this class.
    const y = this.afs
      .collection("classes")
      .doc(classObj.classID)
      .collection("attendees")
      .doc("registered")
      .set({
        registered: firebase.firestore.FieldValue.arrayUnion({
          name: user.displayName,
          email: user.email,
          userID: user.uid
        })
      });
    await x;
    await y;
    console.log("All set!");
  }
  async createNewClass(organizerFormData: OrganizerFormData) {
    //I suppose all we really need is the list of meetings, the name, and the creator/owner.
    console.log("org form", organizerFormData);
    const [earliest, latest] = organizerFormData.getEarliestLatest();
    const creatorID = this.afAuth.auth.currentUser.uid;
    const creatorName = this.afAuth.auth.currentUser.displayName;
    const creatorEmail = this.afAuth.auth.currentUser.email;
    const meetings = organizerFormData.meetings;
    const user = this.afAuth.auth.currentUser;
    const classColl = this.afs.collection("classes");
    let classObj = {
      creatorID: creatorID,
      creatorEmail: creatorEmail,
      creatorName: creatorName,
      from: earliest,
      to: latest,
      name: organizerFormData.name,
      meetings: meetings.map(m => {
        m.location = Object.assign({}, m.location);
        return Object.assign({}, m);
      })
    };

    if (organizerFormData.who["password"]) {
      classObj["password"] = organizerFormData.who["password"];
    }
    const classObjRef = await classColl.add(classObj);
    //also add to MY classes, I own.
    const r = this.afs
      .collection("users")
      .doc(creatorID)
      .collection("ownedClasses")
      .doc(classObjRef.id)
      .set({
        name: classObj.name,
        id: classObjRef.id
      });
    return classObjRef.id;
  }
}
