import {IMediaUpload} from "./media-upload.interface";

export interface IAdminUser {
  firstName: string;
  lastName: string;
  imagePath: string;
  roleId: number;
  authToken: string;
}

export interface IAdminShortInfo {
  adminId: number;
  firstName: string;
  lastName: string;
  imagePath?: IMediaUpload[];
  cityVillageId: number;
  cityVillage: string;
}
