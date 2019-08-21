import { UploadImageService } from './../upload-image.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UploadImage } from '../Model/upload-image';

@Component({
  selector: 'app-print-report',
  templateUrl: './print-report.component.html',
  styleUrls: ['./print-report.component.sass']
})
export class PrintReportComponent implements OnInit {
 id:string;
 uploadImage=new UploadImage();

  constructor(private route:ActivatedRoute,
    private uploadImageServices:UploadImageService) { }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    
    if (this.id)this.uploadImageServices
    .getUploadedImageById(this.id)
    .valueChanges()
    .subscribe(item=>{  
        const obj=  Object.assign(this.uploadImage,item);     
          this.uploadImage=obj;
          console.log(this.uploadImage);
    });
       
   }

}
