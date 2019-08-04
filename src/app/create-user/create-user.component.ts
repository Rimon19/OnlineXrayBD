import { AppUser } from './../Model/app-user';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent implements OnInit {
  appUser=new AppUser();
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
  }
  signUp(appUser:AppUser){
    if(appUser) appUser.isUser=true;
    if(appUser.inistituteName==undefined) appUser.inistituteName=null;  
    if(appUser.address==undefined) appUser.address=null;   
    if(appUser.mobile==undefined) appUser.mobile=null;
   this.userService.UserSignUp(appUser).then(success=>{
    this.router.navigate(['/admin-dashboard']);
    
    }).catch(error=>{
      alert(error.message);
    });;
 }

}
