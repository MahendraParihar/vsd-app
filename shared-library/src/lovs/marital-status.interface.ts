import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseMaritalStatus {
  maritalStatus: string;
  imagePath: IMediaUpload[];
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
