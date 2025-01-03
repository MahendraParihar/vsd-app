import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseAddiction {
  addiction: string;
  imagePath: IMediaUpload[];
}

export interface IManageAddiction extends IBaseAddiction {
  addictionId?: number;
}

export interface IAddiction extends IBaseAddiction, ICommonTable {
  addictionId: number;
  active: boolean;
}

export interface IAddictionList extends IAddiction {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
