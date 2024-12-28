import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseRaasi {
  raasi: string;
  imagePath: IMediaUpload[];
}

export interface IManageRaasi extends IBaseRaasi {
  raasiId?: number;
}

export interface IRaasi extends IBaseRaasi, ICommonTable {
  raasiId: number;
  active: boolean;
}

export interface IRaasiList extends IRaasi {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
