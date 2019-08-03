import { AppUser } from './../Model/app-user';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent implements OnInit {
  appUser=new AppUser();
  constructor(private userService:UserService) { }

  ngOnInit() {
  }
  signUp(appUser:AppUser){
    if(appUser) appUser.isUser=true;
    if(appUser.inistituteName==undefined) appUser.inistituteName=null;  
    if(appUser.address==undefined) appUser.address=null;   
    if(appUser.mobile==undefined) appUser.mobile=null;
    
    console.log(appUser);
   this.userService.UserSignUp(appUser);
 }

}
