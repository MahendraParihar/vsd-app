import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseJobStatus {
  jobStatus: string;
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
