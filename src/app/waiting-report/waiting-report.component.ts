import { UploadImageService } from './../upload-image.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadImage } from '../Model/upload-image';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-waiting-report',
  templateUrl: './waiting-report.component.html',
  styleUrls: ['./waiting-report.component.sass']
})
export class WaitingReportComponent implements OnInit ,OnDestroy{
  subscription: Subscription;
  uploadImage: UploadImage[];
  tableResource: DataTableResource<UploadImage>;
  items: UploadImage[] = [];
  itemCount: number; 
  constructor(private uploadImageService:UploadImageService) { }

  ngOnInit() {

    var x = this.uploadImageService.getAllImageUpload();
        this.subscription= x.snapshotChanges().pipe().subscribe(item => {
          this.uploadImage = [];
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key; 
            if(y['isCompletedReport']==false)                   
                   this.uploadImage.push(y as UploadImage);
                      
          });           
          this.initializeTable(this.uploadImage);                    
    
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
