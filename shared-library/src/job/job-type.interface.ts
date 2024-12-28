import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseJobType {
  jobType: string;
  imagePath: IMediaUpload[];
}

export interface IManageJobType extends IBaseJobType {
  jobTypeId?: number;
}

export interface IJobType extends IBaseJobType, ICommonTable {
  jobTypeId: number;
  active: boolean;
}

export interface IJobTypeList extends IJobType {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
