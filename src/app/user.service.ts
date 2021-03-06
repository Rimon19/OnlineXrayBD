

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
  
  // getUsers(): Observable<any> {
  //   return new Observable((observer) => {
  //     this.db.list('/users').snapshotChanges().pipe().subscribe((querySnapshot) => {
  //       let boards = [];
  //       querySnapshot.forEach((doc) => {
  //         let data = doc;
  //         boards.push({
  //           key: doc.key,
            
  //         });
  //       });
  //       observer.next(boards);
  //     });
  //   });
  // }
  

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
        fullName: registrationForm.name,
        email: registrationForm.email,
        password: registrationForm.password,
        termsNcondition:registrationForm.termsNcondition       
      });
    });
   }

   DoctorsignUp(registrationForm){

    return this.af.auth
    .createUserWithEmailAndPassword(registrationForm.email,
     registrationForm.password).then( newUser => {      
       this.userData.child(newUser.user.uid).update({
         fullName: registrationForm.name,
         email: registrationForm.email,
         password: registrationForm.password,       
         
         address:registrationForm.address,
         degree:registrationForm.degree,
         mobile:registrationForm.mobile,
         isDoctor:registrationForm.isDoctor
       });
     });
    }
 
    UserSignUp(registrationForm){

      return this.af.auth
      .createUserWithEmailAndPassword(registrationForm.email,
       registrationForm.password).then( newUser => {      
         this.userData.child(newUser.user.uid).update({
           fullName: registrationForm.name,
           email: registrationForm.email,
           password: registrationForm.password,       
           
           address:registrationForm.address,
           mobile:registrationForm.mobile,
           isUser:registrationForm.isUser,
           inistituteName:registrationForm.inistituteName
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
