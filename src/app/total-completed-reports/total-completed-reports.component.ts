import { UserService } from './../user.service';
import { UploadImageService } from './../upload-image.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from '../model/app-user';
import { UploadImage } from '../Model/upload-image';

@Component({
  selector: 'app-total-completed-reports',
  templateUrl: './total-completed-reports.component.html',
  styleUrls: ['./total-completed-reports.component.sass']
})
export class TotalCompletedReportsComponent implements OnInit {
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
            
              if(y['isDoctor']==true) {
                this.appUser.push(y as AppUser);  
               
                
              }     
                
                      
            });  
            

                this.appUser.forEach(e => {
              
                  var x = this.uploadeImageService.getUploadImageByUserIdSeenByDoctor(e.key);
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
                                    var entryDatObj=new Date(element.doctorSeenDate);
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
                                  c['inistituteName']=e['fullName'];                        
                                  this.calculateUploadImage.push(c); 
                                  
                                  

                            }); 

                      });

                  
    });

      
 }
}
