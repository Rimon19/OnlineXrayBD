import { UploadImageService } from './../upload-image.service';

import { Component, OnInit } from '@angular/core';
import { UploadImage } from '../Model/upload-image';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.sass']
})
export class UserDashboardComponent implements OnInit {
 uploadedImagesInfos:UploadImage;
  constructor(private uploadeImageService:UploadImageService,
    private authServic:AuthService) { }

  ngOnInit() {
    this.authServic.appUid.subscribe(data=>{
      console.log(data.uid);
      if(data){
        this.uploadeImageService.getUploadImageByUserId(data.uid)
        .subscribe(d=>{console.log(this.uploadedImagesInfos=d)})
      }
    })
   

  }

}
