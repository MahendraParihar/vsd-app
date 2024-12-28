import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseMatrimonialRequestedStatus {
  matrimonialRequestedStatus: string;
  imagePath: IMediaUpload[];
}

export interface IManageMatrimonialRequestedStatus extends IBaseMatrimonialRequestedStatus {
  matrimonialRequestedStatusId?: number;
}

export interface IMatrimonialRequestedStatus extends IBaseMatrimonialRequestedStatus, ICommonTable {
  matrimonialRequestedStatusId: number;
  active: boolean;
}

export interface IMatrimonialRequestedStatusList extends IMatrimonialRequestedStatus {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
