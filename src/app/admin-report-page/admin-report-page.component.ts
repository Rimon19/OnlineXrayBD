import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadImage } from '../Model/upload-image';
import { DataTableResource } from 'angular5-data-table';
import { UploadImageService } from '../upload-image.service';

@Component({
  selector: 'app-admin-report-page',
  templateUrl: './admin-report-page.component.html',
  styleUrls: ['./admin-report-page.component.sass']
})
export class AdminReportPageComponent implements OnInit,OnDestroy {

  subscription: Subscription;

  uploadImageForWaitingReport: UploadImage[];
  tableResourceForWaitingReport: DataTableResource<UploadImage>;
  itemsForWaitingReport: UploadImage[] = [];
  itemCountForWaitingReport: number; 


  uploadImageForCompletedReport: UploadImage[];
  tableResourceForCompletedReport: DataTableResource<UploadImage>;
  itemsForCompletedReport: UploadImage[] = [];
  itemCountForCompletedReport: number; 

  constructor(private uploadImageService:UploadImageService) { }

  ngOnInit() {
    var x = this.uploadImageService.getAllImageUpload();
    this.subscription= x.snapshotChanges().subscribe(item => {
      this.uploadImageForWaitingReport = [];
      this.uploadImageForCompletedReport=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;       
      
       if(y['isWaitingReport']==true) {
        this.uploadImageForWaitingReport.push(y as UploadImage);
       }    
      
       if(y['isCompletedReport']==true){
        this.uploadImageForCompletedReport.push(y as UploadImage);

       }
      });  
    console.log(this.uploadImageForCompletedReport);
      this.initializeTableForWaitingReport(this.uploadImageForWaitingReport);    
      this.initializeTableForCompletedReport(this.uploadImageForCompletedReport);
      
    });
    
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeTableForWaitingReport(uImage) {
    this.tableResourceForWaitingReport = new DataTableResource(uImage);
    this.tableResourceForWaitingReport.query({ offset: 0 })
      .then(items => this.itemsForWaitingReport = items);
    this.tableResourceForWaitingReport.count()
      .then(count => this.itemCountForWaitingReport = count);
  }


  reloadItemsForWaitingReport(params) {
    if (!this.tableResourceForWaitingReport) return;

    this.tableResourceForWaitingReport.query(params)
      .then(items => this.itemsForWaitingReport = items);    
  }


  private initializeTableForCompletedReport(uImage) {
    this.tableResourceForCompletedReport = new DataTableResource(uImage);
    this.tableResourceForCompletedReport.query({ offset: 0 })
      .then(items => this.itemsForCompletedReport = items);
    this.tableResourceForCompletedReport.count()
      .then(count => this.itemCountForCompletedReport = count);
  }


  reloadItemsForCompletedReport(params) {
    if (!this.tableResourceForCompletedReport) return;

    this.tableResourceForCompletedReport.query(params)
      .then(items => this.itemsForCompletedReport = items);    
  }

}
