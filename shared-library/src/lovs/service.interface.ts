import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseService {
  service: string;
  imagePath: IMediaUpload[];
}

export interface IManageService extends IBaseService {
  serviceId?: number;
}

export interface IService extends IBaseService, ICommonTable {
  serviceId: number;
  active: boolean;
}

export interface IServiceList extends IService {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
