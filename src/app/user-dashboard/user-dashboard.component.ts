import { UploadImageService } from './../upload-image.service';

import { Component, OnInit } from '@angular/core';
import { UploadImage } from '../Model/upload-image';
import { AuthService } from '../auth.service';
import { Subscription, Subscriber } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.sass']
})
export class UserDashboardComponent implements OnInit {
 uploadedImagesInfos:UploadImage[];
 subscription:Subscription;
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
    
        }); 

      }
    })
       
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
