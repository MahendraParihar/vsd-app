import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseReligion {
  religion: string;
  imagePath: IMediaUpload[];
}

export interface IManageReligion extends IBaseReligion {
  religionId?: number;
}

export interface IReligion extends IBaseReligion, ICommonTable {
  religionId: number;
  active: boolean;
}

export interface IReligionList extends IReligion {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
