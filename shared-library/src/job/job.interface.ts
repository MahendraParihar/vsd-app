import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseJob {
  title: string;
  description: string;
  date: Date;
  time: Date;
  isApproved: boolean;
  approvedBy?: number;
  commentApplicable: boolean;
  tags: string[];
  visitedCount: number;
  imagePath: object;
  noOfPosition: number;
}

export interface IManageJob extends IBaseJob {
  jobId?: number;
}

export interface IJob extends IBaseJob, ICommonTable {
  jobId: number;
  active: boolean;
}

export interface IJobList extends IJob {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
  approvedByUser: IBaseAdminUser;
}
