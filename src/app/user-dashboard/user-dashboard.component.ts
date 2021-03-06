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
 totalUploadImageCount:number;
 totalDueAmounts:number;
 totalUploadthisMonth:number;
 totalUploadPreviousMonth:number;
 todayTotalUpload:number;

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

          this.totalUploadImageCount=this.uploadedImagesInfos.length; 
          this.totalDueAmounts=0;

          var dateObj = new Date();
          var thisMonth = dateObj.getUTCMonth() + 1;
          var previousMonth=dateObj.getUTCMonth();
          var day = dateObj.getUTCDate();
          

          let  countThisMonth=0;
          let countPrevMonth=0;
          let countTodayWork=0;
          for(let uImage of this.uploadedImagesInfos){   

          var entryDatObj=new Date(uImage.entryDate);
           var month=entryDatObj.getUTCMonth() + 1;
           var eDay=entryDatObj.getUTCDate();
           
           if(day=eDay){
            countTodayWork++;
           }
                 

          this.todayTotalUpload=countTodayWork;
           
            if(thisMonth==month){
                countThisMonth++;
            }
            this.totalUploadthisMonth=countThisMonth;
            if(previousMonth==month){
                countPrevMonth++;
            }
            this.totalUploadPreviousMonth=countPrevMonth;
                   
            if(uImage.dueAmount!=undefined){
              this.totalDueAmounts =uImage.dueAmount+this.totalDueAmounts;             
              
            }
            
           
          }
                  
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
