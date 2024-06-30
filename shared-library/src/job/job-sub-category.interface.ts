import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IJobCategory } from "./job-category.interface";

export interface IBaseJobSubCategory {
  jobCategoryId: number;
  jobSubCategory: string;
  imagePath: object;
}

export interface IManageJobSubCategory extends IBaseJobSubCategory {
  jobSubCategoryId?: number;
}

export interface IJobSubCategory extends IBaseJobSubCategory, ICommonTable {
  jobSubCategoryId: number;
  active: boolean;
}

export interface IJobSubCategoryList extends IJobSubCategory {
  jobCategory: IJobCategory;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
