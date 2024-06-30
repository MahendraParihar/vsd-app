import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseMatrimonialStatus {
  matrimonialStatus: string;
  imagePath: object;
}

export interface IManageMatrimonialStatus extends IBaseMatrimonialStatus {
  matrimonialStatusId?: number;
}

export interface IMatrimonialStatus extends IBaseMatrimonialStatus, ICommonTable {
  matrimonialStatusId: number;
  active: boolean;
}

export interface IMatrimonialStatusList extends IMatrimonialStatus {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
