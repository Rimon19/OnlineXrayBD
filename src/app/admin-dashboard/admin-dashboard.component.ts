import { AppUser } from './../Model/app-user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent implements OnInit,OnDestroy {
appUser:AppUser[];
subscription: Subscription;
tableResource: DataTableResource<AppUser>;
items: AppUser[] = [];
itemCount: number; 

doctors=[];
doctorTableResource:DataTableResource<any>;
doctorItems=[];
doctorItemCount:number;

  constructor(private userServices:UserService) { }

//   ngOnInit() {
//     this.userServices.getAllUsers().valueChanges().subscribe(data => {console.log(data)});
//     this.userServices.getAllUsers().snapshotChanges().pipe().subscribe(data => {console.log('snapshot',data) });
//  this.userServices.getUsers().subscribe(data=>{console.log('u',data)})
//   }


  ngOnInit() {
    var x = this.userServices.getAllUsers();
    this.subscription= x.snapshotChanges().subscribe(item => {
      this.appUser = [];
      this.doctors=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
      
       if(y['isUser']==true) {
        this.appUser.push(y as AppUser);
       }    
      
       if(y['isDoctor']==true){
        this.doctors.push(y as AppUser);

       }
      });  

      this.initializeTable(this.appUser);    
      this.initializeTableForDoctor(this.doctors);
    });
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

  private initializeTable(aUser) {
    this.tableResource = new DataTableResource(aUser);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);    
  }

  private initializeTableForDoctor(user) {
    this.doctorTableResource = new DataTableResource(user);
    this.doctorTableResource.query({ offset: 0 })
      .then(items => this.doctorItems = items);
    this.doctorTableResource.count()
      .then(count => this.doctorItemCount = count);
  }

 reloadItemsForDoctors(params) {
    if (!this.doctorTableResource) return;

    this.doctorTableResource.query(params)
      .then(items => this.doctorItems = items);    
  }
 

}
