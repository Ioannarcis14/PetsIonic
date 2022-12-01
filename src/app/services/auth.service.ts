import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { addDoc, collection, collectionData, CollectionReference, Firestore, query, where } from '@angular/fire/firestore';
import { UrlSegment } from '@angular/router';
import { signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { User } from '../models/user';
import { user } from 'rxfire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * RESOURCES
   * https://betterprogramming.pub/angular-13-firebase-authentication-tutorial-with-angularfire-7-23dc8cee42c4
   */

  private _usersCollection: CollectionReference<User>;
  public uuidObt: string;
  public userInfoArr: any;

  constructor(private _auth: Auth, private _firestore: Firestore) {
    this._usersCollection = collection(this._firestore, "users") as CollectionReference<User>;
  }

  isSessionStarted(): boolean {
    var session: any = localStorage.getItem("IONIC_NAVIGATION_PROJECT");
    if (session) {
      return JSON.parse(session).logged;
    }

    return false;
  }
  
  register(email: string, passwd: string, name: string, _profile_pic: string): Promise<boolean> {
    var credentials = createUserWithEmailAndPassword(this._auth, email, passwd);
    return credentials.then(
      (user: UserCredential) => {
        //LS => logged
        localStorage.setItem("IONIC_NAVIGATION_PROJECT", JSON.stringify({'logged': true}));

        //Firestore => user data
        const usr = {
          email: user.user.email,
          name: user.user.displayName? user.user.displayName : '',
          uuid: user.user.uid,
          profile_pic: _profile_pic
        }

        localStorage.setItem("User_info", JSON.stringify({'email': usr.email, 'profile_pic': usr.profile_pic}));

        // Passem l'UUID a una variable i l'afegim al LS
        this.uuidObt = usr.uuid;
        localStorage.setItem("USER_ID", JSON.stringify({'uuid': this.uuidObt}));

        console.log(usr);
        addDoc(this._usersCollection, usr);

        console.log("Correctly registered");

        return true;
      }
    ).finally(
      () => {
        return false;
      }
    );
  }

  // Retorna l'UUID ja sigui desde LS o no
  getUuuid() {
    var uuidSession: any = localStorage.getItem("USER_ID");
    if (uuidSession) {
      this.uuidObt = JSON.parse(uuidSession).uuid;
      return this.uuidObt;
    }
      return this.uuidObt;
  }

  getUserInfo() {
    var sessionUser: any = localStorage.getItem("User_info");
    if (sessionUser) {
      return JSON.parse(sessionUser);
    }

    return false;
  }

  login(email: string, passwd: string): Promise<boolean> {
    var credentials = signInWithEmailAndPassword(this._auth, email, passwd);
    return credentials.then(
      (user: UserCredential) => {
        //LS => logged
        // Assignem l'UUID a una variable i l'afegim al LS
        this.userInfoArr = user.user.photoURL
        this.uuidObt = user.user.uid;

        collectionData(query(this._usersCollection, where('email', '==', email)), {idField: 'id'}).subscribe(
          (dbUser: User[]) => {
            console.log(dbUser);
            console.log(email);
            localStorage.setItem("User_info", JSON.stringify({'user': dbUser}));
          }
        );

        localStorage.setItem("USER_ID", JSON.stringify({'uuid': this.uuidObt}));
        localStorage.setItem("IONIC_NAVIGATION_PROJECT", JSON.stringify({'logged': true}));
        console.log("Correctly logged");
        return true;
      }
    ).finally(
      () => {
        return false;
      }
    );
  }

  loginWithGoogle() {
    var credentials = signInWithPopup(this._auth, new GoogleAuthProvider());
    console.log(credentials);
  }

  // Deslogueig + eliminar UUID del LS
  logout() {
    signOut(this._auth);
    localStorage.setItem("IONIC_NAVIGATION_PROJECT", JSON.stringify({'logged': false}));
    localStorage.removeItem("User_info");
    localStorage.removeItem("USER_ID");
  }

}
