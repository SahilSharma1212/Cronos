export type ApiResponse ={
    success:boolean,
    message:string,
    userId?:string,
    error?:string
}

export type ImageDetailsType = {
    url:string,
    userId:string
    fileId:string,
    fileType:string,
    size:number,
    height:number,
    width:number,
    path:string,
    thumbnailUrl:string,
    isImageAddedToAnyCapsule:boolean
}


export interface CronosCapsulesResponseInterface extends Document {
    _id:string;
  userId: string;
  capsuleName: string;
  createdAt: Date;
  openingDate: Date;
  description:string;
  content: string;
  privacyType: string;
  hasBeenOpened: boolean;
  imagesArray: ImageDetailsType[];
}