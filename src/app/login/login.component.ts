import { AppUser } from './../Model/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }
 appUser:AppUser
 appuser=new AppUser();
  ngOnInit() {
  }

  login(loginForm){
   console.log(loginForm);
    this.auth.signIn(loginForm.email,loginForm.password).then(success=>{
 
     this.auth.appUser$.subscribe(appUser =>{ 
       this.appUser = appUser;
       console.log("app user",this.appUser);
       if(this.appUser.isAdmin){ this.router.navigate(['/admin-dashboard']);}
       if(this.appUser.isUser){ this.router.navigate(['/user-dashboard']);}
       if(this.appUser.isDoctor){this.router.navigate(['/doctor-dashboard'])}
     
     });
     
   }).catch(error=>{
     alert(error.message);
   });
    }




}
