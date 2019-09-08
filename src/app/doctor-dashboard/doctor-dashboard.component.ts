import { UploadImageService } from './../upload-image.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadImage } from '../Model/upload-image';
import { DataTableResource } from 'angular5-data-table';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.sass']
})
export class DoctorDashboardComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  uploadImage: UploadImage[];
  tableResource: DataTableResource<UploadImage>;
  items: UploadImage[] = [];
  itemCount: number; 

  todaysWork:number;
  totalWorkInthisMonth: number;
  totalWorkPreviousMonth: number;
  totalWork: number;
  constructor(private uploadImageService:UploadImageService,
    private authServic:AuthService) { }

  ngOnInit() {

  this.subscription= this.authServic.appUid.subscribe(data=>{
     
      if(data){
       
    var x = this.uploadImageService.getUploadImageByUserIdSeenByDoctor(data.uid);

    this.subscription= x.subscribe(item => {
      
      this.uploadImage = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        if(y['isCompletedReport']==true)                 
                this.uploadImage.push(y as UploadImage);
                
      });  
     
      this.initializeTable(this.uploadImage);  
      var dateObj = new Date();
      var thisMonth = dateObj.getUTCMonth() + 1;
      var previousMonth=dateObj.getUTCMonth();
      var day = dateObj.getUTCDate();

      let  countThisMonth=0;
      let countPrevMonth=0;
      let countTodayWork=0;
      let countTotalWork=0;
      for(let uImage of this.uploadImage){   

        var entryDatObj=new Date(uImage.doctorSeenDate);
         var month=entryDatObj.getUTCMonth() + 1;
         var eDay=entryDatObj.getUTCDate();
         
         if(day=eDay){
          countTodayWork++;
         }
        this.todaysWork=countTodayWork;
        if(thisMonth==month){
          countThisMonth++;
      }
      this.totalWorkInthisMonth=countThisMonth;
      if(previousMonth==month){
          countPrevMonth++;
      }
      this.totalWorkPreviousMonth=countPrevMonth;

      if(uImage.isCompletedReport){
        countTotalWork++;
      }
      this.totalWork=countTotalWork;

        }
                      

    }); 
  }
});
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
  
}
