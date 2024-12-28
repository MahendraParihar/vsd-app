import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseBusiness {
  business: string;
  imagePath: IMediaUpload[];
}

export interface IManageBusiness extends IBaseBusiness {
  businessId?: number;
}

export interface IBusiness extends IBaseBusiness, ICommonTable {
  businessId: number;
  active: boolean;
}

export interface IBusinessList extends IBusiness {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
