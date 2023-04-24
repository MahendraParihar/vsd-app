import {IAddress} from './address.interface';
import {IAdminShortInfo} from "./admin-user.interface";

export interface MandalInterface {
  mandalId: number;
  mandal: string;
  address?: IAddress,
  active: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}
