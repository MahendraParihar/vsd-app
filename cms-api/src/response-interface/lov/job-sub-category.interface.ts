import {IAdminShortInfo} from "../admin-user.interface";

export interface JobSubCategoryInterface {
  id: number;
  name: string;
  jobCategoryId: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
}
