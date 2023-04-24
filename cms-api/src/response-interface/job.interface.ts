import {IAdminShortInfo} from "./admin-user.interface";

export interface JobInterfaceList {
  id: number;
  active: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}
