import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadImage } from './Model/upload-image';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
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

//  getAll():Observable<UploadImage>{
//   return this.db.list('/uploadImage').valueChanges().pipe(catchError(err => of(null)));
//  }

 getAllImageUpload() { 
  return this.db.list('/uploadImage');
}

 getUploadImageByUserId(userId: string) {
 return this.db.list('/uploadImage/', ref => ref
 .orderByChild('uid')
 .equalTo(userId))
 .snapshotChanges()
 .pipe(catchError(err => of(null)));
      
}
getUploadImageByUserIdSeenByDoctor(userId: string) {
  return this.db.list('/uploadImage/', ref => ref
  .orderByChild('seenBy')
  .equalTo(userId))
  .snapshotChanges()
  .pipe(catchError(err => of(null)));
       
 }

 getById(userId):Observable<UploadImage>{
  return this.db.list('/uploadImage/' + userId)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 getUploadedImageById(id){
   return this.db.object('/uploadImage/'+id);
 }

 update(id, obj) {
  return this.db.object('/uploadImage/' + id).update(obj);
 }

  startUpLoad(uploadImage: UploadImage){
    
    const path=`uploadImage/${Date.now()}_${uploadImage.imageUrlFile.name}`;
    uploadImage.imageUrlName=`${Date.now()}_${uploadImage.imageUrlFile.name}`;
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

  deleteUpload(uploadimage: UploadImage) {
    console.log('uploadImageInfo',uploadimage)
  return  this.deleteFileData(uploadimage.key)
    .then( () => {
      let storageRef = firebase.storage().ref();
      storageRef.child(`uploadImage/${uploadimage.imageUrlName}`).delete().then(t=>{

      });
    })
    .catch(error => console.log(error));

  }


  private deleteFileData(key: string) {
    return this.db.list(`uploadImage/`).remove(key);
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
