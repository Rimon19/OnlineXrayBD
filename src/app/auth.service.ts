import { AppUser } from './Model/app-user';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/observable/of'; 
import * as firebase from 'firebase'; 
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  userInfo:AppUser;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
     private router:Router) { 
    this.user$ = afAuth.authState;    
    //  this.user$.subscribe(u =>{
    //    console.log(u.uid);
    //    if (u.uid)  localStorage.setItem("userUid",u.uid);
    // });

    
  }

  loginWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   
  }
  loginWithFb() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

   return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
 
    
  }

  signIn(email,password){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
   
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
   
  } 


  logout() { 
    this.afAuth.auth.signOut();
  }


  get appUid(){

    return this.afAuth.authState;
  }
 
 
  get appUser$() {
    
  return  this.user$.pipe(
      switchMap(

        (user) =>this.userService.gett(user.uid)

        )
    )
    // .subscribe(book => {
    //   this.userInfo = book;
    //   console.log(this.userInfo);
    // });
    
    

    // return this.user$.pipe
    //   .(user => {
       
    //     if (user)  localStorage.setItem("userUid",user.uid);
    
    //     if (user) return this.userService.get(user.uid);
         
    //     return Observable.of(null);
    //   });    
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
     
  }
}
