import {IAdminShortInfo} from "../admin-user.interface";

export interface BusinessInterface {
  id: number;
  name: string;
  imagePath: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
}
