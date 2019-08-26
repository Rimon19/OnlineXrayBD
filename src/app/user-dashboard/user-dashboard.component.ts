import { UploadImageService } from './../upload-image.service';

import { Component, OnInit } from '@angular/core';
import { UploadImage } from '../Model/upload-image';
import { AuthService } from '../auth.service';
import { Subscription, Subscriber } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.sass']
})
export class UserDashboardComponent implements OnInit {
 uploadedImagesInfos:UploadImage[];
 subscription:Subscription;

 tableResource: DataTableResource<UploadImage>;
 items: UploadImage[] = [];
 itemCount: number; 
  constructor(private uploadeImageService:UploadImageService,
    private authServic:AuthService) { }

 

  ngOnInit() {

    this.authServic.appUid.subscribe(data=>{
      console.log(data.uid);
      if(data){
        
        var x = this.uploadeImageService.getUploadImageByUserId(data.uid);
        this.subscription= x.subscribe(item => {
          this.uploadedImagesInfos = [];
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key;                 
           this.uploadedImagesInfos.push(y as UploadImage);
                      
          });                      
    
          this.initializeTable(this.uploadedImagesInfos);
        }); 

      }
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


  delete(obj){
    this.uploadeImageService.deleteUpload(obj).then(t=>{
      console.log("deleted");
    });
  }
 
}
