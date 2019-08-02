

import { AngularFireAuth } from '@angular/fire/auth';
//import { AngularFireDatabase, FirebaseObjectObservable } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'; 
import { AppUser } from './model/app-user';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  userData:any;
  

  constructor(private db: AngularFireDatabase,private af:AngularFireAuth) {
    this.userData=firebase.database().ref('/users');
   }

   getAllUsers() { 
    return this.db.list('/users');
  }
  

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

   signUp(registrationForm){

   return this.af.auth
   .createUserWithEmailAndPassword(registrationForm.email,
    registrationForm.password).then( newUser => {      
      this.userData.child(newUser.user.uid).update({
        name: registrationForm.UserName,
        email: registrationForm.email,
        password: registrationForm.password,
        nermsAndCondition:registrationForm.TermsAndCondition                     
      });
    });
   }

  get(uid: string) { 
    return this.db.object('/users/' + uid);
  }
  
  gett(u:string): Observable<AppUser> {
    return this.db.object('/users/' + "/" + u).valueChanges().pipe(
        catchError(err => of(null))
    );
  }
}
