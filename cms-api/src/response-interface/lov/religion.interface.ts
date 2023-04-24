import {IAdminShortInfo} from "../admin-user.interface";

export interface ReligionInterface {
  id: number;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
}
