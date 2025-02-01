import { IMediaUpload } from './media-upload.interface';

export interface IMemberPost {
  postId: number;
  familyIds: number[];
}

export interface IMemberPostInfo {
  post: string;
  members: {
    firstName: string;
    middleName: string;
    lastName: string;
    cityVillage: string | null;
    imagePath: IMediaUpload | null;
  }[];
}
