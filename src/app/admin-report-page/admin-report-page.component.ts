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
  uploadImage: UploadImage;
  tableResource: DataTableResource<UploadImage>;
  items: UploadImage[] = [];
  itemCount: number; 
  constructor(private uploadImageService:UploadImageService) { }

  ngOnInit() {
      this.subscription=this.uploadImageService.getAll().subscribe(data=>{
        console.log(data);
        this.uploadImage=data;
        this.initializeTable(data);
      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeTable(uImage) {
    this.tableResource = new DataTableResource(uImage);
    this.tableResource.query({ offset: 0 })
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
