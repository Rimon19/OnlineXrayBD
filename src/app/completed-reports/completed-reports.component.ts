import { Component, OnInit } from '@angular/core';
import { UploadImage } from '../Model/upload-image';
import { UploadImageService } from '../upload-image.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-completed-reports',
  templateUrl: './completed-reports.component.html',
  styleUrls: ['./completed-reports.component.sass']
})
export class CompletedReportsComponent implements OnInit {

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
