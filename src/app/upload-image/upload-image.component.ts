import { AuthService } from './../auth.service';
import { UploadImageService } from './../upload-image.service';
import { Component, OnInit } from '@angular/core';
import { UploadImage } from '../Model/upload-image';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.sass']
})
export class UploadImageComponent implements OnInit {
  selectedFilesForImage:FileList;
  uploadImage=new UploadImage;
  subscription: Subscription;
  uploadImages:UploadImage[];
  totalUpload:any;
  constructor(private uploadImageService:UploadImageService,
    private authServic:AuthService,
    private router:Router) { }
 
  saveImageUpload(uploadImage){

    uploadImage.entryDate = new Date().getTime();
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

      uploadImage.searchDate = year + '' + month + '' + day;
      uploadImage.dueAmount=30;
      uploadImage.code='00000'+(this.totalUpload+1);
     this.authServic.appUid.subscribe(data=>{
       if(data) uploadImage.uid=data.uid;
     })
     uploadImage.isCompletedReport=false;
      this.uploadImageService.startUpLoad(uploadImage);
      this.router.navigate(['/user-dashboard']);
     }


 edit(uploadImage){
   //get edit id

   //then get object by id

   //then delete them 

   //then save new object newly


 }


  ngOnInit() {

    var allUploadImage = this.uploadImageService.getAllImageUpload();
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

  detectFilesForImageUrlFile(event) {
    this.selectedFilesForImage = event.target.files;
    this.uploadImage.imageUrlFile = this.selectedFilesForImage.item(0);
  }
}
