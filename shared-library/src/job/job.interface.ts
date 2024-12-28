import { IBaseAdminUser, ICommonSEO, ICommonTable } from '../base.interface';

export interface IBaseJob {
  title: string;
  description: string;
  date: Date;
  time: Date;
  isApproved: boolean;
  approvedBy?: number;
  commentApplicable: boolean;
  visitedCount: number;
  imagePath: object;
  noOfPosition: number;
}

export interface IManageJob extends IBaseJob, ICommonSEO {
  jobId?: number;
}

export interface IJob extends IBaseJob, ICommonTable, ICommonSEO {
  jobId: number;
  active: boolean;
}

export interface IJobList extends IJob {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
  approvedByUser: IBaseAdminUser;
}
