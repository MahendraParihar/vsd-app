import {IAdminShortInfo} from "./admin-user.interface";

export interface LegalPageListInterface {
  id: number;
  name: string;
  active: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}
