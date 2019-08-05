import { UserService } from './../user.service';
import { AppUser } from './../Model/app-user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.sass']
})
export class CreateDoctorComponent implements OnInit {
appUser=new AppUser();
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
  }
  signUp(appUser:AppUser){
    if(appUser) appUser.isDoctor=true;
    if(appUser.address==undefined) appUser.address=null;
    if(appUser.degree==undefined) appUser.degree=null;
    if(appUser.mobile==undefined) appUser.mobile=null;
   this.userService.DoctorsignUp(appUser).then(success=>{
    this.router.navigate(['/admin-dashboard']);
    
    }).catch(error=>{
      alert(error.message);
    });
 
 }
}
