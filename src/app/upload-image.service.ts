import { UploadImage } from './Model/upload-image';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  uImage=new UploadImage;
  constructor() { }

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
