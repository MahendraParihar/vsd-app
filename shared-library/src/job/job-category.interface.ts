import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseJobCategory {
  jobCategory: string;
  imagePath: IMediaUpload[];
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
