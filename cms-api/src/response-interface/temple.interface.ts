import {IAddress} from './address.interface';
import {IAdminShortInfo} from "./admin-user.interface";
import {IMediaUpload} from "./media-upload.interface";

export interface TempleInterface {
  templeId: number;
  imagePath?: IMediaUpload[];
  active: boolean;
  templeName: string;
  address?: IAddress;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}
