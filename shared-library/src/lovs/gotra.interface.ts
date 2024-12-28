import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseGotra {
  gotra: string;
  imagePath: IMediaUpload[];
}

export interface IManageGotra extends IBaseGotra {
  gotraId?: number;
}

export interface IGotra extends IBaseGotra, ICommonTable {
  gotraId: number;
  active: boolean;
}

export interface IGotraList extends IGotra {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
