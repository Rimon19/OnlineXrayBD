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
  constructor(private uploadImageService:UploadImageService) { }
 
  saveImageUpload(uploadImage){
    console.log(uploadImage);
       this.uploadImageService.pushUpload(uploadImage);
     }


  ngOnInit() {
  }

  detectFilesForImageUrlFile(event) {
    this.selectedFilesForImage = event.target.files;
    this.uploadImage.imageUrlFile = this.selectedFilesForImage.item(0);
  }
}
