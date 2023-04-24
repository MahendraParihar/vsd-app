import {IAdminShortInfo} from "./admin-user.interface";

export interface AppUserListInterface {
  id: number;
  firstName: string;
  lastName: string;
  cityVillage: string;
  district: string;
  state: string;
  country: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}
