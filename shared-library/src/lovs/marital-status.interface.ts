import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseMaritalStatus {
  maritalStatus: string;
}

export interface IManageMaritalStatus extends IBaseMaritalStatus {
  maritalStatusId?: number;
}

export interface IMaritalStatus extends IBaseMaritalStatus, ICommonTable {
  maritalStatusId: number;
  active: boolean;
}

export interface IMaritalStatusList extends IMaritalStatus {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
