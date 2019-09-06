
import { UploadImage } from './../Model/upload-image';
import { UploadImageService } from './../upload-image.service';
import { AppUser } from './../Model/app-user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';
@Component({
  selector: 'app-totaluser-component',
  templateUrl: './totaluser-component.component.html',
  styleUrls: ['./totaluser-component.component.sass']
})
export class TotaluserComponentComponent implements OnInit {

  appUser:AppUser[];
subscription: Subscription;
tableResource: DataTableResource<AppUser>;
items: AppUser[] = [];
itemCount: number; 

doctors=[];
doctorTableResource:DataTableResource<any>;
doctorItems=[];
doctorItemCount:number;
totalDoctor:number;
totalUser:number;
totalUpload:number;
uploadImages:UploadImage[]
  constructor(private userServices:UserService,
    private uploadService:UploadImageService) { }

//   ngOnInit() {
//     this.userServices.getAllUsers().valueChanges().subscribe(data => {console.log(data)});
//     this.userServices.getAllUsers().snapshotChanges().pipe().subscribe(data => {console.log('snapshot',data) });
//  this.userServices.getUsers().subscribe(data=>{console.log('u',data)})
//   }


  ngOnInit() {
    var x = this.userServices.getAllUsers();
    var allUploadImage=this.uploadService.getAllImageUpload();
    this.subscription= x.snapshotChanges().subscribe(item => {
      this.appUser = [];
      this.doctors=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
      
       if(y['isUser']==true) {
        this.appUser.push(y as AppUser);
        this.totalUser=this.appUser.length;
       }    
      
       if(y['isDoctor']==true){
        this.doctors.push(y as AppUser);
        this.totalDoctor=this.doctors.length;
       }
      });  

      this.initializeTable(this.appUser);    
      this.initializeTableForDoctor(this.doctors);
    });
    
  
    this.subscription= allUploadImage.snapshotChanges().subscribe(item => {
      this.uploadImages=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
      
       
        this.uploadImages.push(y as UploadImage);
        this.totalUpload=this.uploadImages.length;
                   
      }); 
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
