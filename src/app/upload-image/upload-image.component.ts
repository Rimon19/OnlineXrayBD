import { AuthService } from './../auth.service';
import { UploadImageService } from './../upload-image.service';
import { Component, OnInit } from '@angular/core';
import { UploadImage } from '../Model/upload-image';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.sass']
})
export class UploadImageComponent implements OnInit {
  selectedFilesForImage:FileList;
  uploadImage=new UploadImage;
  constructor(private uploadImageService:UploadImageService,private authServic:AuthService) { }
 
  saveImageUpload(uploadImage){

    uploadImage.entryDate = new Date().getTime();
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

      uploadImage.searchDate = year + '' + month + '' + day;
     this.authServic.appUid.subscribe(data=>{
       if(data) uploadImage.uid=data.uid;
     })
    
      this.uploadImageService.startUpLoad(uploadImage);
     }


  ngOnInit() {
  }

  detectFilesForImageUrlFile(event) {
    this.selectedFilesForImage = event.target.files;
    this.uploadImage.imageUrlFile = this.selectedFilesForImage.item(0);
  }
}
