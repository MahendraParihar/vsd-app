import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseJobStatus {
  jobStatus: string;
  imagePath: IMediaUpload[];
}

export interface IManageJobStatus extends IBaseJobStatus {
  jobStatusId?: number;
}

export interface IJobStatus extends IBaseJobStatus, ICommonTable {
  jobStatusId: number;
  active: boolean;
}

export interface IJobStatusList extends IJobStatus {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
