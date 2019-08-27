import { AuthService } from './../auth.service';
import { UploadImage } from './../Model/upload-image';
import { UploadImageService } from './../upload-image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Key } from 'protractor';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-doctor-report-view',
  templateUrl: './doctor-report-view.component.html',
  styleUrls: ['./doctor-report-view.component.sass']
})
export class DoctorReportViewComponent implements OnInit {
 id:string;
 uploadedImageInfos:UploadImage[];
 uploadImage=new UploadImage();
  constructor(private route:ActivatedRoute,
    private uploadImageServices:UploadImageService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
   this.id=this.route.snapshot.paramMap.get('id');
   
   if (this.id)this.uploadImageServices
   .getUploadedImageById(this.id)
   .valueChanges()
   .subscribe(item=>{  
       const obj=  Object.assign(this.uploadImage,item);     
         this.uploadImage=obj;
   });
      
  }

  updateImageUpload(uploadedImageObj){
  
   this.authService.appUid.subscribe(data=>{
   uploadedImageObj.seenBy=data.uid;      
   uploadedImageObj.isCompletedReport=true;
  this.uploadImageServices.update(this.id,uploadedImageObj);
  this.router.navigate(['/waiting-report']);
   })


  }

}
