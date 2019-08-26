import { Subscription } from 'rxjs';
import { UploadImageService } from './../upload-image.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadImage } from '../Model/upload-image';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-print-report',
  templateUrl: './print-report.component.html',
  styleUrls: ['./print-report.component.sass']
})
export class PrintReportComponent implements OnInit,OnDestroy {
 id:string;
 uploadImage=new UploadImage();
subscription:Subscription;
  constructor(private route:ActivatedRoute,
    private uploadImageServices:UploadImageService) { }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    
    if (this.id)this.subscription=this.uploadImageServices
    .getUploadedImageById(this.id)
    .valueChanges()
    .subscribe(item=>{  
        const obj=  Object.assign(this.uploadImage,item);     
          this.uploadImage=obj;
         const c= this.uploadImage.comment.split('\n')
         this.uploadImage.commentStringArray=c ;
    
    });
       
   }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }
    print(){
      const printContent = document.getElementById("contentToConvert");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
    }

captureScreen() {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  

  
}
