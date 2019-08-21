import { Key } from 'protractor';
import { AppUser } from './../Model/app-user';
import { Component, OnInit } from '@angular/core';
import { UploadImage } from '../Model/upload-image';
import { UploadImageService } from '../upload-image.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';
import { UserService } from '../user.service';

@Component({
  selector: 'app-completed-reports',
  templateUrl: './completed-reports.component.html',
  styleUrls: ['./completed-reports.component.sass']
})
export class CompletedReportsComponent implements OnInit {

  subscription: Subscription;
  uploadImage: UploadImage[];
  tableResource: DataTableResource<UploadImage>;
  items: UploadImage[] = [];
  itemCount: number; 
  appuser=[];
  constructor(private uploadeImageService:UploadImageService,
    private authServic:AuthService,private auth:AuthService,private user:UserService) { }

    ngOnInit() {

      this.auth.appUid.subscribe(s=>{


        var x = this.uploadeImageService.getUploadImageByUserId(s.uid);

        this.subscription= x.subscribe(item => {
          this.uploadImage = [];
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key;
            if(y['isCompletedReport']==true)                 
                    this.uploadImage.push(y as UploadImage);
                      
          });    
          
          this.user.getAllUsers().snapshotChanges().pipe().subscribe(data=>{
            data.forEach(element => {
              var user = element.payload.toJSON();
              user['key']=element.key;  
              this.appuser.push(user);            
            
            });
           
            this.uploadImage.forEach(element => {
              if(element.seenBy){
                this.appuser.forEach(e => {
                  if(element.seenBy==e.key){
                    element.seenBy=e.fullName;                   
                  }
                });
              }                
            });           
         });
          this.initializeTable(this.uploadImage);                    
    
        }); 
  

      })
    
     

    }
    
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  
    private initializeTable(uImage) {
      this.tableResource = new DataTableResource(uImage);
      this.tableResource
        .query({ offset: 0 })
        .then(items => this.items = items);
        
         this.tableResource.count()
        .then(count => this.itemCount = count);
    }
  
  
    reloadItems(params) {
      if (!this.tableResource) return;
  
      this.tableResource.query(params)
        .then(items => this.items = items);    
    }
}
