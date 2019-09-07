import { UserService } from './../user.service';
import { UploadImageService } from './../upload-image.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from '../model/app-user';
import { UploadImage } from '../Model/upload-image';

@Component({
  selector: 'app-totaluploads-component',
  templateUrl: './totaluploads-component.component.html',
  styleUrls: ['./totaluploads-component.component.sass']
})
export class TotaluploadsComponentComponent implements OnInit {
  subscription: Subscription;
  appUser:AppUser[];
  appUserOfDoctor=[];
  uploadedImagesInfos:UploadImage[];
  uploadedImagesInfosForDoctors=[]
  calculateUploadImage=[];
  calculateUploadImageForDoctor=[];
  constructor(private uploadeImageService:UploadImageService,
    private userServices:UserService) { }

  ngOnInit() {
    var x = this.userServices.getAllUsers();   
    this.subscription= x.snapshotChanges().subscribe(item => {
      this.appUser = [];
            item.forEach(element => {
              var y = element.payload.toJSON();
              y["key"] = element.key;
            
              if(y['isUser']==true) {
                this.appUser.push(y as AppUser);  
                
              }     
                
                      
            });  
            

                this.appUser.forEach(element => {

                  var x = this.uploadeImageService.getUploadImageByUserId(element.key);
                      this.subscription= x.subscribe(item => {

                                  this.uploadedImagesInfos = [];
                                

                                  item.forEach(element => {
                                    var y = element.payload.toJSON();
                                    y["key"] = element.key;  

                                    this.uploadedImagesInfos.push(y as UploadImage);                        
                                  
                                  });


                                  var dateObj = new Date();
                                  var thisMonth = dateObj.getUTCMonth() + 1;
                                  var previousMonth=dateObj.getUTCMonth();
                                  var day = dateObj.getUTCDate();
                                  let  countThisMonth=0;
                                  let countPrevMonth=0;
                                
                                  var c=[];
                                  this.uploadedImagesInfos.forEach(element => {
                                    var entryDatObj=new Date(element.entryDate);
                                    var month=entryDatObj.getUTCMonth() + 1;

                                    if(thisMonth==month){
                                      countThisMonth++;
                                  }
                                  
                                  c["thisMonth"]=countThisMonth;
                                  if(previousMonth==month){
                                      countPrevMonth++;
                                  }
                                  c["lasMonth"]=countPrevMonth;

                                
                                    

                                  });
                                  c['total']=this.uploadedImagesInfos.length;
                                  c['inistituteName']=element.inistituteName;                        
                                  this.calculateUploadImage.push(c); 
                                  
                                  

                            }); 

                      });

                  
    });

      
 }
}