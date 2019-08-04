import { UserService } from './../user.service';
import { AppUser } from './../Model/app-user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
 
  appUser=new AppUser();
  constructor(private userService:UserService ) { }

  ngOnInit() {
  }
  signUp(appUser:AppUser){
    if(appUser.termsNcondition!=true){appUser.termsNcondition=false};
    appUser.isAdmin=true;
    this.userService.signUp(appUser);
  }

}
