import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseMatrimonialRequestedStatus {
  matrimonialRequestedStatus: string;
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
