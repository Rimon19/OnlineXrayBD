import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadImage } from './Model/upload-image';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  uImage=new UploadImage;

  task:AngularFireUploadTask;
  percentage:Observable<number>;
  snapshot:Observable<any>;
  downloadURL:string;
  constructor(private db: AngularFireDatabase, private storage:AngularFireStorage) { }

  startUpLoad(uploadImage: UploadImage){
    const path=`uploadImage/${Date.now()}_${uploadImage.imageUrlFile.name}`;
    const ref=this.storage.ref(path);
    
    this.task=this.storage.upload(path,uploadImage.imageUrlFile);
 

    this.percentage=this.task.percentageChanges();
 
   
    this.snapshot=this.task.snapshotChanges().pipe(
      finalize(async()=>{
        await ref.getDownloadURL().toPromise().then(t=>{

          uploadImage.imageUrl=t;
          this.db.list(`uploadImage/`).push(uploadImage);
        });

        
      
      }),
    );
        
    this.snapshot.subscribe(d=>{})
  }

  pushUpload(uploadImage: UploadImage) {
    let storageRef = firebase.storage().ref();
    //uploadimageurl
    let uploadTaskImageUrl = storageRef
      .child(`uploads/uploadImage/${uploadImage.imageUrlFile.name}`)
      .put(uploadImage.imageUrlFile);
    uploadTaskImageUrl.on(firebase.storage.TaskEvent.STATE_CHANGED,
       (snapshot) => {
      },
      (error) => {
        console.log(error)
      },
      (): any => {
        //upload success
        this.uImage.imageUrl = uploadTaskImageUrl.snapshot.downloadURL;
        this.uImage.imageUrlName = uploadImage.imageUrlFile.name;
        console.log("i",this.uImage.imageUrl);
        console.log('in',this.uImage.imageUrlName);
      }
    );
  }


}
