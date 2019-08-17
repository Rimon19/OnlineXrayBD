export class UploadImage { 
    key:string;
    name: string;
    age: number;   
    sexId:string;
    refBy:string;
    xrayName:string;
    problem:string;
    
    imageUrl:string;
    imageUrlFile:File;
    imageUrlName:string;
    entryDate:number;
    searchDate:string;
    uid:string;

    isWaitingReport:boolean;
    isCompletedReport:boolean;
  }