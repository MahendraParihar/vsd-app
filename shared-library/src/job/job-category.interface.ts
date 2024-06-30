import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseJobCategory {
  jobCategory: string;
  imagePath: object;
}

export interface IManageJobCategory extends IBaseJobCategory {
  jobCategoryId?: number;
}

export interface IJobCategory extends IBaseJobCategory, ICommonTable {
  jobCategoryId: number;
  active: boolean;
}

export interface IJobCategoryList extends IJobCategory {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
